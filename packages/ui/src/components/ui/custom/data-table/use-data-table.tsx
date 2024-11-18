import { useMemo } from "react";
import { Checkbox } from "../../checkbox";
import type { DataTableProps, UseDataTableReturn } from "./types";

export const useDataTable = <TData, TValue>({
  columns: initColumns,
  data,
  selectable,
  enablePagination,
}: DataTableProps<TData, TValue>): UseDataTableReturn<TData, TValue> => {
  const columns = useMemo(() => {
    if (selectable) {
      return [
        {
          id: "select",
          header: ({ table }) => (
            <Checkbox
              aria-label="Select all"
              checked={
                table.getIsAllPageRowsSelected() ||
                (table.getIsSomePageRowsSelected() && "indeterminate")
              }
              onCheckedChange={(value) => {
                table.toggleAllPageRowsSelected(Boolean(value));
              }}
            />
          ),
          cell: ({ row }) => (
            <Checkbox
              aria-label="Select row"
              checked={row.getIsSelected()}
              onCheckedChange={(value) => {
                row.toggleSelected(Boolean(value));
              }}
            />
          ),
          enableSorting: false,
          enableHiding: false,
        },
        ...initColumns,
      ];
    }
    return initColumns;
  }, [initColumns, selectable]);

  return {
    columns,
    data,
    enablePagination: enablePagination || false,
    selectable: selectable || false,
  };
};
