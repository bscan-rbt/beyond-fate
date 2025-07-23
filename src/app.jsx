import { Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { Suspense } from "solid-js";
import Navbar from "~/components/navigation/Navbar";
import "./app.css";
import ArticleProvider from "./context/ArticleProvider";
import UserProvider from "./context/UserProvider";
import { getUser } from "./lib";

export const route = {
  preload: () => getUser()
}

export default function App() {

  return (
    <Router
      actionBase=""
      root={props => (
        <UserProvider>
        <ArticleProvider>
          
          <Navbar />
          <main class='h-[100%]'>
          <Suspense>{props.children}</Suspense>
          </main>

        </ArticleProvider>
        </UserProvider>

      )}
    >
      <FileRoutes />
    </Router>
  );
}
