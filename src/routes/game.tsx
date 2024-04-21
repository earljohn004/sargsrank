import { Box, Divider } from "@mui/material";
import { NavigateToResource } from "@refinedev/react-router-v6/.";
import { Route, Link, Outlet } from "react-router-dom";
import { PageMenu } from "../components/view/pagemenu";
import { CreateGame, GameHistory } from "../pages/games";
import { GameProgress } from "../pages/games/gameprogress";

export const GameRoute = () => {
  return (
    <>
      <Route
        path="/games"
        element={
          <>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <PageMenu resource="games" />
              </Box>
              <Link
                to={"create"}
                style={{
                  marginRight: 20,
                }}
              >
                {"Create Game"}
              </Link>
            </Box>
            <Divider sx={{ marginTop: 2, marginBottom: 2 }} />
            <Outlet />
          </>
        }
      >
        <Route index element={<NavigateToResource resource="inprogress" />} />
        <Route path="create" element={<CreateGame />} />
        <Route path="history" element={<GameHistory />} />
        <Route path="inprogress" element={<GameProgress />} />
      </Route>
    </>
  );
};
