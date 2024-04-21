import { ResourceProps } from "@refinedev/core";

export const refineResources: ResourceProps[] = [
  {
    name: "leaderboard",
    list: "/leaderboard",
  },
  {
    name: "games",
    list: "/games",
    create: "/games/create",
    meta: {
      canDelete: true,
    },
  },
  {
    name: "inprogress",
    list: "/games/inprogress",
    meta: {
      parent: "games",
      label: "In Progress",
    },
  },
  {
    name: "history",
    list: "/games/history",
    meta: {
      parent: "games",
      label: "History",
    },
  },
  {
    name: "profile",
    list: "/profile",
    meta: {
      label: "Profile",
    },
  },
  {
    name: "overview",
    list: "/profile/overview",
    meta: {
      parent: "profile",
      label: "Overview",
    },
  },
  {
    name: "match-history",
    list: "/profile/match_history",
    meta: {
      parent: "profile",
      label: "Match History",
    },
  },
];
