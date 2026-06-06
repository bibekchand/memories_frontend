import { createBrowserRouter } from "react-router";
import Home from "../pages/Home.jsx";
import Inbox from "../pages/Inbox.jsx";
import Login from "../pages/Login.jsx";
import Project from "../pages/Project.jsx";
import Register from "../pages/Register.jsx";
import AuthLoading from "../pages/AuthLoading.jsx";
import {
  projectTasksLoader,
  inboxTaskLoader,
  personalInfoLoader,
} from "./loaders.jsx";

const router = createBrowserRouter(
  [
    { path: "/", Component: AuthLoading},
    {
      path: "/app",
      loader: personalInfoLoader,
      Component: Home,
      children: [
        { index: true, Component: Inbox, loader: inboxTaskLoader },
        { path: "inbox", Component: Inbox, loader: inboxTaskLoader },
        {
          loader: projectTasksLoader,
          path: "project/:project_id",
          Component: Project,
        },
      ],
    },
    {
      path: "/login",
      Component: Login,
    },
    {
      path: "/register",
      Component: Register,
    },
  ],
  {
    basename: "/memories_frontend/",
  },
);
export default router;
