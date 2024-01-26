import { Authenticated, GitHubBanner, Refine, WelcomePage } from "@refinedev/core";
import { DevtoolsPanel, DevtoolsProvider } from "@refinedev/devtools";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";

import { useNotificationProvider } from "@refinedev/antd";
import "@refinedev/antd/dist/reset.css";

import { authProvider, dataProvider, liveProvider } from "./providers";
import routerBindings, {
  CatchAllNavigate,
  DocumentTitleHandler,
  UnsavedChangesNotifier,
} from "@refinedev/react-router-v6";
import { App as AntdApp } from "antd";
import { createClient } from "graphql-ws";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import { Home, ForgotPassword, Register, Login } from "./pages";
import Layout from "./components/layout";
import { resources } from "./config/resources";
import { CompanyList } from "./pages/company/list";
import Create from "./pages/company/create";
import Edit from "./pages/company/edit";
import { List } from "antd/lib";

function App() {

  return (
    <BrowserRouter>

      <RefineKbarProvider>
        <>
          <AntdApp>
            <DevtoolsProvider>
              <Refine
                dataProvider={dataProvider}
                liveProvider={liveProvider}
                notificationProvider={useNotificationProvider}
                routerProvider={routerBindings}
                authProvider={authProvider}
                resources={resources}
                options={{
                  syncWithLocation: true,
                  warnWhenUnsavedChanges: true,
                  useNewQueryKeys: true,
                  projectId: "vA5g9P-R4BgAA-y3nqSt",
                  liveMode: "auto",
                }}
              >

                <Routes>
                  <Route path="/forgotPassword" element={<ForgotPassword />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="login" element={<Login />} />
                  <Route element={
                    < Authenticated
                      key='authenticated-layout'
                      fallback={<CatchAllNavigate to="/login" />} >

                      <Layout>
                        <Outlet />

                      </Layout>
                    </Authenticated>


                  } >
                    <Route index element={<Home />} />
                    <Route path="/companies"  >
                      <Route index element={<CompanyList />} />
                      <Route path="new" element={<Create />} />
                      <Route path="edit/:id" element={<Edit />} />
                    </Route>
                    <Route path="/tasks">
                      <Route index element={<List />} />

                    </Route>



                  </Route>
                </Routes>


                <RefineKbar />
                <UnsavedChangesNotifier />
                <DocumentTitleHandler />
              </Refine>
              <DevtoolsPanel />
            </DevtoolsProvider>
          </AntdApp>
        </>
      </RefineKbarProvider>
    </BrowserRouter >
  );
}

export default App;
