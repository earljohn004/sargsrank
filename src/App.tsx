import { Authenticated, Refine } from "@refinedev/core";
import { DevtoolsProvider } from "@refinedev/devtools";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";

import {
  ErrorComponent,
  RefineSnackbarProvider,
  ThemedLayoutV2,
} from "@refinedev/mui";

import CssBaseline from "@mui/material/CssBaseline";
import GlobalStyles from "@mui/material/GlobalStyles";
import routerBindings, {
  CatchAllNavigate,
  DocumentTitleHandler,
  NavigateToResource,
  UnsavedChangesNotifier,
} from "@refinedev/react-router-v6";
import axios from "axios";
import { BrowserRouter, Link, Outlet, Route, Routes } from "react-router-dom";
import { ColorModeContextProvider } from "./contexts/color-mode";
import LeaderBoardList from "./pages/leaderboard/list";
import { firebaseAuth, firestoreDatabase } from "./config/firebaseConfig";
import { Login } from "./pages/login";
import { ForgotPassword } from "./pages/forgotPassword";
import { Register } from "./pages/register";
import { ThemedHeaderV2 } from "./components/layout/header";
import { ThemedSiderV2 } from "./components/layout/sider";
import { ThemedTitleV2 } from "./components/layout/title";
import { refineResources } from "./resources";
import ShowProfile from "./pages/profile/list";
import { Box, Divider } from "@mui/material";
import { PageMenu } from "./components/view/pagemenu";
import { CreateGame, GameHistory } from "./pages/games";
import { GameProgress } from "./pages/games/gameprogress";

function App() {
  return (
    <BrowserRouter>
      <RefineKbarProvider>
        <ColorModeContextProvider>
          <CssBaseline />
          <GlobalStyles styles={{ html: { WebkitFontSmoothing: "auto" } }} />
          <RefineSnackbarProvider>
            <DevtoolsProvider>
              <Refine
                dataProvider={firestoreDatabase.getDataProvider()}
                routerProvider={routerBindings}
                authProvider={firebaseAuth.getAuthProvider()}
                resources={refineResources}
                options={{
                  syncWithLocation: true,
                  warnWhenUnsavedChanges: true,
                  useNewQueryKeys: true,
                  projectId: "HVz9Wu-eJUg8G-7Baq4w",
                }}
              >
                <Routes>
                  <Route
                    element={
                      <Authenticated
                        key="authenticated-inner"
                        fallback={<CatchAllNavigate to="/login" />}
                      >
                        <ThemedLayoutV2
                          Header={ThemedHeaderV2}
                          Sider={ThemedSiderV2}
                          Title={ThemedTitleV2}
                        >
                          <Outlet />
                        </ThemedLayoutV2>
                      </Authenticated>
                    }
                  >
                    <Route
                      index
                      element={<NavigateToResource resource="games" />}
                    />
                    <Route path="/leaderboard">
                      <Route
                        index
                        element={
                          <>
                            <LeaderBoardList />
                          </>
                        }
                      />
                    </Route>
                    {/* Game Route */}
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
                      <Route
                        index
                        element={<NavigateToResource resource="inprogress" />}
                      />
                      <Route path="create" element={<CreateGame />} />
                      <Route path="history" element={<GameHistory />} />
                      <Route path="inprogress" element={<GameProgress />} />
                    </Route>

                    {/* Profile Route */}
                    <Route
                      path="/profile"
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
                              <PageMenu resource="profile" />
                            </Box>
                          </Box>
                          <Divider sx={{ marginTop: 2, marginBottom: 2 }} />
                          <Outlet />
                        </>
                      }
                    >
                      <Route
                        index
                        element={<NavigateToResource resource="overview" />}
                      />
                      <Route path="overview" element={<>This is overview</>} />
                      <Route
                        path="match_history"
                        element={<>This is histry</>}
                      />
                    </Route>

                    <Route path="*" element={<ErrorComponent />} />
                  </Route>

                  {/* Error Route */}
                  <Route
                    element={
                      <Authenticated
                        key="authenticated-outer"
                        fallback={<Outlet />}
                      >
                        <NavigateToResource />
                      </Authenticated>
                    }
                  >
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route
                      path="/forgot-password"
                      element={<ForgotPassword />}
                    />
                  </Route>
                </Routes>

                <RefineKbar />
                <UnsavedChangesNotifier />
                <DocumentTitleHandler />
              </Refine>
            </DevtoolsProvider>
          </RefineSnackbarProvider>
        </ColorModeContextProvider>
      </RefineKbarProvider>
    </BrowserRouter>
  );
}

export default App;
