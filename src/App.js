import { createContext, useState } from "react";
import { RouterProvider } from "react-router-dom";
import Auth from "./auth";
import { mainRoutes } from "./routes";
import { getUserKey } from "./utils";
export const Context = createContext({});
function App() {
  const [user, setUser] = useState(getUserKey());

  return (
    <Context.Provider value={[user, setUser]}>
      {user ? <RouterProvider router={mainRoutes} /> : <Auth />}
    </Context.Provider>
  );
}

export default App;
