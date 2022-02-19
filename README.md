# Template for Firebase Hosting and Cloud Functions for Firebase

## How to use

1. Push `Use this template` or simply copy and paste this repository files to your repository.
1. Copy [.firebaserc.template](./.firebaserc.template) as [.firebaserc](./.firebaserc).
1. Copy [.env.template](./.env.template) as [.env.local](./.env.local).
1. Copy [config-template.ts](./functions/src/shared/config/config-template.ts) as [config.ts](./functions/src/shared/config/config.ts).
1. Change project ID in .firebaserc, .env.* and [env.ts](./functions/src/shared/env.ts) to your Firebase project ID.

## Setup

```bash
yarn install
yarn run login
```

## Local development

```bash
yarn run serve
```

You can access <http://localhost:5000> on your browser.

## Development deploy

```bash
yarn run deploy:dev
```

## Production deploy

```bash
yarn run deploy:prod
```
