import * as functions from "firebase-functions";
import * as express from "express";
import {config} from "../shared/config/config";
import {Env} from "../shared/env";

export type ErrorResponse = { status: 400, message: string, code: "INVALID_PARAM" }
  | { status: 401, message: string, code: "NOT_LOGIN" }
  | { status: 403, message: string, code: "INVALID_ACCESS" }
  | { status: 404, message: string, code: "NOT_FOUND" }
  | { status: 409, message: string, code: "ALREADY_EXISTS" }
  | { status: 500, message: string, code: "INTERNAL_SERVER_ERROR" }
  | { status: 503, message: string, code: "MAINTENANCE" }

export class Response {

  private static send(request: functions.https.Request, response: express.Response, status: number, contentType: string, body: any) {
    Response.setResponseHeaders(response, Response.getAcceptedOrigin(request));
    response.status(status).contentType(contentType).send(body)
  }

  static successAsRaw(request: functions.https.Request, response: express.Response, contentType: string, body: any) {
    Response.send(request, response, 200, contentType, body)
  }

  static success(request: functions.https.Request, response: express.Response, body?: object) {
    Response.send(request, response, 200, 'application/json', body)
  }

  static error(request: functions.https.Request, response: express.Response, error: ErrorResponse) {
    Response.send(request, response, error.status, 'application/json', error)
  }

  static exception(request: functions.https.Request, response: express.Response, e: Error) {
    Response.error(request, response, {
      status: 500,
      message: Env.value === 'production'
        ? "Unknown error occurs."
        : `Unknown error occurs. name: ${e.name} message: ${e.message}, stack: ${e.stack}`,
      code: "INTERNAL_SERVER_ERROR"
    })
  }

  private static getAcceptedOrigin(request: functions.https.Request): string | false {
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

  private static setResponseHeaders(response: express.Response, origin: string | false): express.Response {
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

}

