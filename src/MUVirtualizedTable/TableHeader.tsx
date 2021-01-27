import React from "react";
import TableCell from "@material-ui/core/TableCell";
import clsx from "clsx";
import { TableHeaderProps } from "react-virtualized";

function TableHeader({
  label,
  columnIndex,
  classes,
  headerHeight,
  columns,
}: TableHeaderProps & { columnIndex: number; classes: any; headerHeight: number; columns: Array<any> }) {
  return (
    <TableCell
      component='div'
      className={clsx(classes.tableCell, classes.flexContainer, classes.noClick)}
      variant='head'
      style={{ height: headerHeight }}
      align={columns[columnIndex]?.numeric || false ? "right" : "left"}
    >
      <span>{label}</span>
    </TableCell>
  );
}

export default React.memo(TableHeader);
