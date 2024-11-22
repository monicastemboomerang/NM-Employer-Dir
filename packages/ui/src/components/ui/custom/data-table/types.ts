import type {
  Column as OrigColumn,
  ColumnDef as OrigColumnDef,
  Header as OrigHeader,
} from "@tanstack/react-table";

export type ColumnDef<TData, TValue> = OrigColumnDef<TData, TValue> & {
  //   sortable?: boolean;
  numeric?: boolean;

  //   hideable?: boolean;
};

export type Column<TData, TValue> = Omit<
  OrigColumn<TData, TValue>,
  "columnDef"
> & {
  columnDef: ColumnDef<TData, TValue>;
};

export type Header<TData, TValue> = Omit<
  OrigHeader<TData, TValue>,
  "column"
> & {
  column: Column<TData, TValue>;
};

export interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  enablePagination?: boolean;
  selectable?: boolean;
}

// type TableComponentType<TData, TValue> = Omit<
//   DataTableProps<TData, TValue>,
//   "data"
// >;

type TableComponentType<TData, TValue> = DataTableProps<TData, TValue>;
export type UseDataTableReturn<TData, TValue> = Required<
  TableComponentType<TData, TValue>
>;
