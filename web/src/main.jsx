import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import "./App.css";
import BlogDetailsPage from "./pages/BlogDetailsPage.jsx";
import BlogPostPage from "./pages/BlogPostPage.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/blog-details/:blogId",
    element: <BlogDetailsPage />,
  },
  {
    path: "/post-blog",
    element: <BlogPostPage />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
