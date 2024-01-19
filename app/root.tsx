import { LiveReload, Outlet } from "@remix-run/react";

export default function app() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Remix Jokes</title>
      </head>
      <body>
        <Outlet/>
        <LiveReload />
      </body>
    </html>
  )
}