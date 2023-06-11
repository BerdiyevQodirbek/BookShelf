import { createContext, useEffect, useState } from "react";
import { RouterProvider, useNavigate } from "react-router-dom";
import { sign } from "./api";
import Auth from "./auth";
import { mainRoutes } from "./routes";
import { getUserKey } from "./utils";
export const Context = createContext({});
function App() {
  const [user, setUser] = useState(getUserKey());

  useEffect(() => {
    console.log(user);
  }, [user]);

  return (
    <Context.Provider value={[user, setUser]}>
      {user ? <RouterProvider router={mainRoutes} /> : <Auth />}
    </Context.Provider>
  );
}

export default App;
