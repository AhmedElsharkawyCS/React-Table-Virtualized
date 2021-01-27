import React from "react";
import clsx from "clsx";
import { makeStyles, Theme } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import { AutoSizer, Column, RowMouseEventHandlerParams, Table, InfiniteLoaderChildProps, InfiniteLoader } from "react-virtualized";
import TableHeader from "./TableHeader";
import TableRowCell from "./TableRowCell";
import TableContainer from "@material-ui/core/TableContainer";
import { MuiVirtualizedTableProps } from "./Types";
declare module "@material-ui/core/styles/withStyles" {
  // Augment the BaseCSSProperties so that we can control jss-rtl
  interface BaseCSSProperties {
    /*
     * Used to control if the rule-set should be affected by rtl transformation
     */
    flip?: boolean;
  }
}
const useStyles = makeStyles((theme: Theme) => {
  return {
    flexContainer: {
      display: "flex",
      alignItems: "center",
      boxSizing: "border-box",
      height: "100%",
    },
    table: {
      "& .ReactVirtualized__Table__headerRow": {
        flip: false,
        paddingRight: theme.direction === "rtl" ? "0 !important" : undefined,
      },
    },
    tableRow: {
      cursor: "pointer",
      height: "100%",
    },
    tableRowHover: {
      "&:hover": {
        backgroundColor: theme.palette.grey[200],
      },
    },
    tableCell: {
      flex: 1,
      height: "100%",
    },
    noClick: {
      cursor: "initial",
    },
  };
});

function VirtualizedTable({ onRowClick, columns, rowHeight, headerHeight, expansionRowHeight, ...VTProps }: MuiVirtualizedTableProps) {
  const classes = useStyles();
  const [selectedIndex, setSelectedIndex] = React.useState<number>(-1);
  const tableRef = React.useRef<any>();

  const onTableRowClick = React.useCallback(
    (props: RowMouseEventHandlerParams) => {
      if (onRowClick) {
        onRowClick(props);
      }
      setSelectedIndex(props.index);
    },
    [onRowClick],
  );
  const getRowClassName = React.useCallback(
    ({ index }: { index: number }) => {
      return clsx(classes.tableRow, classes.flexContainer, {
        [classes.tableRowHover]: index !== -1 && onRowClick != null,
      });
    },
    [classes.flexContainer, classes.tableRow, classes.tableRowHover, onRowClick],
  );

  const getRowHeight = React.useCallback(({ index }: { index: number }) => (index === selectedIndex ? expansionRowHeight || 80 : rowHeight || 60), [
    expansionRowHeight,
    rowHeight,
    selectedIndex,
  ]);
  React.useEffect(() => {
    if (tableRef.current) {
      tableRef.current.recomputeRowHeights();
    }
  }, [selectedIndex]);

  return (
    <TableContainer component={Paper} style={{ ...VTProps.tableContainerDimension, ...VTProps.containerStyle }}>
      <InfiniteLoader isRowLoaded={VTProps.isRowLoaded} loadMoreRows={VTProps.loadMoreRows} rowCount={5000000}>
        {({ onRowsRendered }: InfiniteLoaderChildProps) => (
          <AutoSizer>
            {({ height, width }) => (
              <Table
                height={height}
                width={width}
                style={{ ...VTProps.tableStyle }}
                onRowClick={onTableRowClick}
                ref={tableRef}
                overscanRowCount={20}
                headerStyle={{ backgroundColor: "#e2e0e0" }}
                rowStyle={{ ...VTProps.rowsStyle, transition: VTProps.transition }}
                onRowsRendered={onRowsRendered}
                rowHeight={getRowHeight}
                gridStyle={{
                  direction: "inherit",
                }}
                headerHeight={headerHeight!}
                className={classes.table}
                disableHeader={!VTProps.enableTableHeader}
                {...VTProps}
                rowClassName={getRowClassName}
              >
                {columns.map(({ dataKey, ...other }, index) => {
                  const calculatedWidth: number = typeof other.width === "string" ? (parseFloat(other.width) * width) / 100 : other.width;
                  return (
                    <Column
                      {...other}
                      width={calculatedWidth}
                      key={index}
                      headerRenderer={(headerProps: any) => (
                        <TableHeader {...headerProps} columnIndex={index} classes={classes} headerHeight={headerHeight} columns={columns} />
                      )}
                      className={classes.flexContainer}
                      cellRenderer={(props: any) => {
                        return <TableRowCell {...props} columns={columns} classes={classes} hover={true} selectedIndex={selectedIndex} />;
                      }}
                      dataKey={dataKey}
                    />
                  );
                })}
              </Table>
            )}
          </AutoSizer>
        )}
      </InfiniteLoader>
    </TableContainer>
  );
}
VirtualizedTable.defaultProps = {
  headerHeight: 55,
  rowHeight: 55,
  expansionRowHeight: 80,
  tableContainerDimension: { height: 550, width: "100%" },
  transition: "all 400ms ease-in-out",
};

export default VirtualizedTable;
