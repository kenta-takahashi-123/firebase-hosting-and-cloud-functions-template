import * as functions from 'firebase-functions';
import {config} from "./shared/config/config";
import {helloController} from "./controller/hello";
import {userController} from "./controller/user";
import {renderHTMLController} from "./controller/renderHTML";

const endpoint = functions.region(config.region).https

// API
export const hello = endpoint.onRequest(helloController);
export const user = endpoint.onRequest(userController);

// Serve dynamic content
// See: https://firebase.google.com/docs/hosting/functions?hl=ja
export const renderHTML = functions.region('us-central1').https.onRequest(renderHTMLController)
