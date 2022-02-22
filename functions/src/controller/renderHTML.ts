import {Response} from "../lib/response";
import * as functions from "firebase-functions";
import * as express from "express";

export function renderHTMLController(request: functions.https.Request, response: express.Response) {
  if (
    request.headers['authorization'] !== "Basic YWRtaW46cGFzc3dvcmQ=" // admin/password
  ) {
    response.set('WWW-Authenticate', 'Basic realm="Access to the DEV"').sendStatus(401)
    return;
  }

  response.set('Cache-Control', 'public, max-age=30, s-maxage=60')
  Response.successAsRaw(request, response, 'text/html', `<!DOCTYPE html>
<html lang="en" dir="ltr">

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="shortcut icon" href="/static/images/favicon.ico">
    <base href="/">
    <title>Firebase hosting template sample</title>
    <link href="/main.css" rel="stylesheet"></head>
</head>
<body>
<div class="bg-light p-5">
    <h1 class="display-4">Admin page</h1>
    <p class="lead">This is a sample for rendering by server-side.</p>
</div>
<script src="/main.js"></script></body>
</body>
</html>`);
}
