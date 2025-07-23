// @refresh reload
import { createHandler, StartServer } from "@solidjs/start/server";

export default createHandler(() => (
  <StartServer
    document={({ assets, children, scripts }) => (
      <html lang="en" title="Beyond fate">
        <head>
          <title>Beyond Fate</title>
          <meta charset="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="description" content="A fantasy deckbuilding game built around traditional TTRPG mechanics."/>
          <link rel="icon" href="/favicon.ico" />
          {assets}
        </head>
        <body>

          <div id="app">{children}</div>
          {scripts}
        </body>
      </html>
    )}
  />
));
