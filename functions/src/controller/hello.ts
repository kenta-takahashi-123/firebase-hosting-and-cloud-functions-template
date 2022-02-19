import {Response} from "../lib/response";
import * as functions from "firebase-functions";
import * as express from "express";
import {Env} from "../shared/env";

export function helloController(request: functions.https.Request, response: express.Response) {
  Response.success(request, response, {
    message: "Hello from " + request.hostname + " in " + Env.value + "!"
  });
}
