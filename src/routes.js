import { createBrowserRouter } from "react-router-dom";
import SignIn from "./auth/signIn";
import SignUp from "./auth/signUp";
import BookShelf from "./pages/bookShelf";
import NotFoundPage from "./pages/notFoundPage";

export const mainRoutes = createBrowserRouter([
  {
    path: "/",
    element: <BookShelf />,
    errorElement: <NotFoundPage url="/" />,
  },
]);
export const authRoutes = createBrowserRouter([
  {
    path: "/",
    element: <SignIn />,
    errorElement: <NotFoundPage url="/sign-in" />,
  },
  {
    path: "/sign-in",
    element: <SignIn />,
    errorElement: <NotFoundPage url="/sign-in" />,
  },
  {
    path: "/sign-up",
    element: <SignUp />,
    errorElement: <NotFoundPage url="/sign-in" />,
  },
]);
