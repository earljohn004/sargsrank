import React from "react";
import LeaderBoardComponent from "../../components/LeaderBoardComponent";
import { List } from "@refinedev/mui";

const LeaderBoardList = () => {
  return (
    <>
      <List>
        <LeaderBoardComponent />
        <LeaderBoardComponent />
        <LeaderBoardComponent />
      </List>
    </>
  );
};

export default LeaderBoardList;
