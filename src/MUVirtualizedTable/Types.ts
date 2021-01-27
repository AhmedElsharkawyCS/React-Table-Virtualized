import { RowMouseEventHandlerParams, TableCellProps } from "react-virtualized";
export interface Data {
  id: number;
  name: string;
  email: string;
}
export interface ColumnData {
  dataKey: string;
  label: string;
  numeric?: boolean;
  width: number | string;
  actions?: {
    onColumnSelect?: (row: object, value: number | string | object, rowIndex: number) => void;
    onColumnClick?: (row: object, value: number | string | object, rowIndex: number) => void;
  };
  columnStyle?: React.CSSProperties;
  render?: (row: object, index: number, props: { isExpanded?: boolean }) => React.ReactElement;
}

export interface ITableCellProps extends TableCellProps {
  selectedIndex: number;
  hover: boolean;
  classes: any;
  headerHeight: number;
  columns: Array<ColumnData>;
}

export interface MuiVirtualizedTableProps {
  columns: ColumnData[];
  headerHeight?: number;
  onRowClick?: (props: RowMouseEventHandlerParams) => void;
  rowCount: number;
  rowGetter: (row: { index: number }) => Data;
  rowHeight?: number;
  expansionRowHeight?: number;
  lastSelectedIndex?: number;
  transition?: string;
  enableTableHeader?: boolean;
  rowsStyle?: React.CSSProperties;
  tableStyle?: React.CSSProperties;
  containerStyle?: React.CSSProperties;
  isRowLoaded: (props: { index: number }) => boolean;
  loadMoreRows: (props: { startIndex: number; stopIndex: number }) => Promise<any>;
  tableContainerDimension?: { height?: number | string; width?: number | string };
}
