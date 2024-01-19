import { LiveReload, Outlet, Links } from "@remix-run/react";
import globalStylesUrl from "./styles/global.css";
import globalLargeStylesUrl from "./styles/global-large.css";
import globalMediumStylesUrl from "./styles/global-medium.css";
import { LinksFunction } from "@remix-run/node";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: globalStylesUrl },
  { rel: "stylesheet", href: globalMediumStylesUrl, media: "(min-width: 640px)" },
  { rel: "stylesheet", href: globalLargeStylesUrl, media: "(min-width: 1024px)" }
];

export default function app() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Remix Jokes</title>
        <Links/>
      </head>
      <body>
        <Outlet/>
        <LiveReload />
      </body>
    </html>
  )
}