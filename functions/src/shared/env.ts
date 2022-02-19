export class Env {

  private static getProjectId = () => {
    // See: https://firebase.google.com/docs/functions/config-env?hl=ja#automatically_populated_environment_variables
    return JSON.parse(process.env.FIREBASE_CONFIG as string)["projectId"];
  }

  private static getValue: () => "production" | "development" | "local" = () => {
    switch (Env.getProjectId()) {
      case 'xxx':
        return 'production'
      case 'yyy':
        return 'development'
      default:
        return 'local'
    }
  }

  static readonly projectId = Env.getProjectId()
  static readonly value: "production" | "development" | "local" = Env.getValue()

}
