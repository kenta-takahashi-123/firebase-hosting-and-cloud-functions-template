import {Env} from "../env";
import {configProduction} from "./config-production";
import {configDevelopment} from "./config-development";

const region = "asia-northeast1"

export const config = Env.value === "production" ? configProduction : Env.value === "development" ? configDevelopment : {

  region,

  baseURL: {
    serviceAPI: `http://localhost:5001/${Env.projectId}/${region}/`,
  },

  acceptableOrigins: [
    'localhost:5000',
  ],

}
