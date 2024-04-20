import { ResourceProps } from "@refinedev/core";

export const refineResources: ResourceProps[] = [
    {
      name: "leaderboard",
      list: "/leaderboard",
    },
    {
      name: "games",
      list: "/gamelist",
      create: "/gamelist/create",
      show: "/gamelist/show/:id",
      meta: {
        canDelete: true,
      },
    },
    {
      name: "inprogress",
      list: "/inprogress",
      meta: {
        parent: "games",
        label: "In Progress"
      },
    },
    {
      name: "history",
      list: "/history",
      meta: {
        parent: "games",
        label: "History"
      },
    },
    {
      name: "profile",
      list: "/profile",
      show: "/profile/:id",
    },
    {
      name: "overview",
      list: "/overview",
      meta: {
        parent: "profile",
        label: "Overview"
      },
    },
    {
      name: "match-history",
      list: "/match_history",
      meta: {
        parent: "profile",
        label: "Match History"
      },
    },
];
