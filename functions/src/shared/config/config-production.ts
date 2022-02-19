import {Env} from "../env";

const region = "asia-northeast1"

export const configProduction = {

  region,

  baseURL: {
    serviceAPI: `https://${region}-${Env.projectId}.cloudfunctions.net/`,
  },

  acceptableOrigins: [
  ],
}
