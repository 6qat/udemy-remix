import type {LinksFunction} from "@remix-run/node";
import {
  isRouteErrorResponse,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useRouteError,
} from "@remix-run/react";

import mainStyles from "~/styles/main.css";
import MainNavigation from "~/components/MainNavigation";

export const links: LinksFunction = () => [
  {rel: "stylesheet", href: mainStyles},
];

export default function App() {
  return (
    <html lang="en">
    <head>
      <meta charSet="utf-8"/>
      <meta name="viewport" content="width=device-width, initial-scale=1"/>
      <Meta/>
      <Links/>
    </head>
    <body>
    <header>
      <MainNavigation/>
    </header>
    <Outlet/>
    <ScrollRestoration/>
    <Scripts/>
    <LiveReload/>
    </body>
    </html>
  );
}

export function ErrorBoundary() {

  const error = useRouteError();
  const errorOutput = checkError(error);

  return (
    <html lang="en">
    <head>
      <meta charSet="utf-8"/>
      <meta name="viewport" content="width=device-width, initial-scale=1"/>
      <Meta/>
      <Links/>
      <title>Error occurred!</title>
    </head>
    <body>
    <header>
      <MainNavigation/>
    </header>
    <main className="error">
      <h1>An error occurred!</h1>
      {errorOutput}
    </main>
    <ScrollRestoration/>
    <Scripts/>
    <LiveReload/>
    </body>
    </html>
  );
}

function checkError(error: any) {
  if (isRouteErrorResponse(error)) {
    return (
      <div>
        <h1>
          {error.status} {error.statusText}
        </h1>
        <p>{error.data}</p>
      </div>
    );
  } else if (error instanceof Error) {
    return (
      <div>
        <h1>Error</h1>
        <p>{error.message}</p>
        <p>The stack trace is:</p>
        <p>{error.stack}</p>
      </div>
    );
  } else {
    return <h1>Unknown Error</h1>;
  }
}