import { RouterProvider } from "react-router-dom";
import { authRoutes } from "../routes";

function Auth() {
  return <RouterProvider router={authRoutes} />;
}

export default Auth;
