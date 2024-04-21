import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { List, useDataGrid } from "@refinedev/mui";
import { useEffect, useMemo, useState } from "react";
import { Typography } from "@mui/material";
import { TabView } from "../../components/view/tabview";

export const GameProgress = () => {
  const { dataGridProps } = useDataGrid({
    syncWithLocation: true,
    pagination: {
      mode: "off",
    },
    filters: {
      initial: [],
    },
  });

  const columns = useMemo<GridColDef[]>(
    () => [
      {
        field: "gameId",
        headerName: "Game ID",
      },
      {
        field: "description",
        headerName: "Description",
        minWidth: 200
      },
      {
        field: "gameStatus",
        headerName: "Status",
      },
      {
        field: "gameType",
        headerName: "Game Type",
      },
      {
        field: "race",
        headerName: "Race",
      },
      {
        field: "addedBy",
        headerName: "Date",
      },
      {
        field: "createdAt",
        headerName: "Time",
      },
    ],
    []
  );

  return (
    <TabView title="Games In Progress">
      <DataGrid hideFooter {...dataGridProps} columns={columns} autoHeight />
    </TabView>
  );
};
