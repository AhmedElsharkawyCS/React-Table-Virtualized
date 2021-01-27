import React from "react";

import TableCell from "@material-ui/core/TableCell";
import clsx from "clsx";
import { ITableCellProps } from "./Types";

const TableRowCell = ({ cellData, columnIndex, classes, hover, columns, rowData, rowIndex, selectedIndex }: ITableCellProps) => {
  const { actions, render, columnStyle } = columns[columnIndex];
  const onClick = React.useCallback(
    (row: object, value: number | string | object, index: number) => {
      if (actions?.onColumnClick) actions.onColumnClick(row, value, index);
    },
    [actions],
  );
  const onSelect = React.useCallback(
    (row: object, value: number | string | object, index: number) => {
      if (actions?.onColumnSelect) actions.onColumnSelect(row, value, index);
    },
    [actions],
  );
  return React.useMemo(
    () => (
      <TableCell
        component='div'
        onClick={() => onClick(rowData, cellData, rowIndex)}
        onSelect={() => onSelect(rowData, cellData, rowIndex)}
        className={clsx(classes.tableCell, classes.flexContainer, {
          [classes.noClick]: !hover,
        })}
        variant='body'
        align={(columnIndex != null && columns[columnIndex].numeric) || false ? "right" : "left"}
        style={{ ...columnStyle }}
      >
        {render ? render(rowData, rowIndex, { isExpanded: selectedIndex === rowIndex }) : cellData}
      </TableCell>
    ),
    [
      cellData,
      classes.flexContainer,
      classes.noClick,
      classes.tableCell,
      columnIndex,
      columnStyle,
      columns,
      hover,
      onClick,
      onSelect,
      render,
      rowData,
      rowIndex,
      selectedIndex,
    ],
  );
};

export default TableRowCell;
