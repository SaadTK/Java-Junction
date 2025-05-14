import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import MainLayout from "./layouts/MainLayout";
import Home from "./components/Home";
import AddCoffee from "./components/AddCoffee";
import UpdateCoffee from "./components/UpdateCoffee";
import { createBrowserRouter, RouterProvider } from "react-router";

const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "/addCoffee",
        Component: AddCoffee,
      },
      {
        path: "/updateCoffee",
        Component: UpdateCoffee,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
