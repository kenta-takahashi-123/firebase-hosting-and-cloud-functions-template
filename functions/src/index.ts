import * as functions from 'firebase-functions';
import * as express from "express";
import {config} from "./shared/config/config";
import {Env} from "./shared/env";
import {User} from "./shared/user";

const endpoint = functions.region(config.region).https

export const hello = endpoint.onRequest((request, response) => {
  setResponseHeaders(response, getAcceptedOrigin(request));
  response.send("Hello from " + request.hostname + " in " + Env.value + "!");
});

export const user = endpoint.onRequest((request, response) => {
  setResponseHeaders(response, getAcceptedOrigin(request));
  const user = User.fromObject(request.body);
  response.send("Hello " + user.nickname + "!")
});

function getAcceptedOrigin(request: functions.https.Request): string | false {
  const originRaw = request.header('Origin');
  if (originRaw === undefined) {
    return false;
  }

  try {
    const origin = new URL(originRaw);
    if (config.acceptableOrigins.findIndex(x => x === origin.host || origin.host.endsWith('.' + x)) === -1) {
      return false;
    }
    return originRaw;
  } catch (e) {
    console.error(`Invalid origin request. origin: ${originRaw}`, e)
    return false;
  }
}

function setResponseHeaders(response: express.Response, origin: string | false): express.Response {
  response.set('X-Content-Type-Options', 'nosniff');
  response.set('X-Frame-Options', 'DENY');
  if (origin !== false) {
    response.set('Access-Control-Allow-Origin', origin.replace('/$', ''));
  } else {
    response.set('Access-Control-Allow-Origin', '*'); // For returning error response to invalid origin request
  }
  response.set('Access-Control-Allow-Methods', 'OPTIONS, POST, PUT, DELETE');
  response.set('Access-Control-Allow-Headers', 'Origin, Content-Type, X-ID-Token, X-Requested-With');
  return response;
}
