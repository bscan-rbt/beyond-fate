import { createAsync, Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { createContext, Suspense } from "solid-js";
import "./app.css";
import Navbar from "~/components/Navbar";
import { getUser } from "./lib";
import UserProvider from "./context/UserProvider";

export const route = {
  preload: () => getUser()
}

export default function App() {

  return (
    <Router
      root={props => (
        <UserProvider>
          
          <Navbar />
          <main class='h-[100%]'>
          <Suspense>{props.children}</Suspense>
          </main>


        </UserProvider>

      )}
    >
      <FileRoutes />
    </Router>
  );
}
