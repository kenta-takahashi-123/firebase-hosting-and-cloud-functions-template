import * as functions from 'firebase-functions';
import {config} from "./shared/config/config";
import {helloController} from "./controller/hello";
import {userController} from "./controller/user";

const endpoint = functions.region(config.region).https

export const hello = endpoint.onRequest(helloController);
export const user = endpoint.onRequest(userController);
