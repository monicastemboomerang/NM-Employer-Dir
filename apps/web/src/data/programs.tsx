import { Programs, type Employer } from "@repo/program-data";
import type { ColumnDef } from "@repo/ui";
import {
  Button,
  DataTable,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
  useDataTable,
} from "@repo/ui";
import { SquareArrowOutUpRight } from "lucide-react";
import { BadgeDisplay } from "../components/badge-display";

const columns: ColumnDef<Employer, unknown>[] = [
  {
    accessorKey: "name",
    header: "Name",

    enableSorting: true,
  },
  // {
  //   accessorKey: "by",
  //   header: "Organization",
  //   enableSorting: true,
  // },
  {
    accessorKey: "overview",
    header: "Overview",
    cell: ({ row }) => {
      const val: string = row.getValue("overview");
      return (
        <Tooltip>
          <TooltipTrigger>
            <div className="line-clamp-4">{val}</div>
          </TooltipTrigger>
          <TooltipContent>{val}</TooltipContent>
        </Tooltip>
      );
    },
  },
  {
    accessorKey: "categories",
    header: "Industry Categories",
    cell: ({ row }) => {
      const value = row.getValue<string[]>("categories");
      return <BadgeDisplay value={value} />;
    },
    filterFn: "arrIncludesSome",
    enableColumnFilter: true,
  },
  // {
  //   accessorKey: "curriculumTypes",
  //   header: "Curriculum Types",
  //   filterFn: "arrIncludesSome",
  //   enableColumnFilter: true,
  //   cell: ({ row }) => {
  //     const value = row.getValue<string[]>("curriculumTypes");
  //     return <BadgeDisplay value={value} />;
  //   },
  // },

  // {
  //   accessorKey: "curriculumFocusAreas",
  //   header: "Curriculums",
  //   filterFn: "arrIncludesSome",
  //   enableColumnFilter: true,
  //   cell: ({ row }) => {
  //     const value = row.getValue<string[]>("curriculumFocusAreas");
  //     return <BadgeDisplay value={value} />;
  //   },
  // },

  {
    accessorKey: "location",
    header: "Location",
  },
  {
    accessorKey: "slug",
    header: "",
    cell: ({ cell }) => {
      const value = cell.getValue<string>();
      return (
        <Button
          aria-label="View"
          className="text-sm"
          href={`/programs/${value}`}
          size="icon"
          variant="ghost"
        >
          <SquareArrowOutUpRight size={16} />
        </Button>
      );
      // return <a href={`/programs/${value}`}>View</a>;
    },
  },
];

export function ProgramsDataTable({ programs }: { programs?: Employer[] }) {
  //   const { db, findTodos } = useDatabase();
  //   const [data, setData] = useState<TodoDocType[]>([]);
  //   useEffect(() => {
  //     findTodos().then((res) => {
  //       if (res) {
  //         console.log("RES", res);
  //         setData(res);
  //       }
  //     });
  //   }, [db]);

  const model = useDataTable({
    columns,
    data: programs || Programs.instance.programs,
    enablePagination: true,
    // selectable: true,
  });

  return (
    <div className="grid grid-flow-row auto-rows-max gap-3">
      {/* <DataTableViewOptions table={model.table} /> */}
      <TooltipProvider>
        <DataTable {...model} />
      </TooltipProvider>
    </div>
  );
}
