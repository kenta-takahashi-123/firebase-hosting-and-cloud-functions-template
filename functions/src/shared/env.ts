export class Env {

  private static getProjectId = () => {
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

  static readonly region = "asia-northeast1"
  static readonly projectId = Env.getProjectId()

  static readonly authEmulatorHost = process.env.FIREBASE_AUTH_EMULATOR_HOST
  static readonly firestoreEmulatorHost = process.env.FIRESTORE_EMULATOR_HOST
  static readonly value: "production" | "development" | "local" = Env.getValue()

}
