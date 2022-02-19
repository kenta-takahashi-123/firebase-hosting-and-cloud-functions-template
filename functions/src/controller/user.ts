import {Response} from "../lib/response";
import * as functions from "firebase-functions";
import * as express from "express";
import {User} from "../shared/user";

export function userController(request: functions.https.Request, response: express.Response) {
  const user = User.fromObject(request.body);
  Response.success(request, response, {
    message: "Hello " + user.nickname + "!"
  });
}
