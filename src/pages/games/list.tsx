import { Outlet } from "react-router-dom";
import { TabView } from "../../components/view/tabview";
import { Grid } from "@mui/material";

export const GameList = () => {
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Outlet />
        </Grid>
        <Grid item xs={6}>
          <TabView/>
        </Grid>
      </Grid>
    </>
  );
};
