import { createBrowserRouter, RouterProvider } from "react-router-dom";
import PageLayout from "./components/layout/PageLayout";
import AboutPage from "./pages/AboutPage";
import HomePage from "./pages/HomePage";
import IncidentsPage from "./pages/IncidentsPage";
import DemoPage from "./pages/DemoPage";
import { FEATURES } from "./config/app.config";

const routes = [
  {
    path: "/",
    element: <PageLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "incidents", element: <IncidentsPage /> },
      { path: "about", element: <AboutPage /> },
      ...(FEATURES.enableDemo ? [{ path: "demo", element: <DemoPage /> }] : []),
    ],
  },
];

const router = createBrowserRouter(routes, { basename: import.meta.env.BASE_URL });

export function AppRouter() {
  return <RouterProvider router={router} />;
}

export default router;
