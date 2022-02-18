import * as functions from 'firebase-functions';
import {User} from "./shared/user";
import {Env} from "./shared/env";

export const hello = functions.https.onRequest((request, response) => {
  response.send("Hello from " + request.hostname + " in " + Env.value + "!");
});

export const user = functions.https.onRequest((request, response) => {
  const user = User.fromObject(request.body);
  response.send("Hello " + user.nickname + "!")
});
