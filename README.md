# lyx-trails

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.0.3.

## Install Dependencies

 - `npm install -g @angular/cli`
 - `npm install -g firebase`

## Environments
Put environment config files under `src/environments`

environment.ts
```javascript
export const environment = {
  production: false,
  firebase: {
    apiKey: "<api_key>",
    authDomain: "<auth_domain>",
    databaseURL: "<database_url>",
    storageBucket: "<storage_bucket>",
    projectId: "<project_id>"
  }
};
```

environment.prod.ts
```javascript
export const environment = {
  production: true,
  firebase: {
    apiKey: "<api_key>",
    authDomain: "<auth_domain>",
    databaseURL: "<database_url>",
    storageBucket: "<storage_bucket>",
    projectId: "<project_id>"
  }
};
```

## Development server

`npm run dev`

## Build

`ng build`

## Start local server

`firebase serve`

## Deploy

`firebase deploy -m "..."`

## References
### Fonts
  - dancingman: https://www.fontspace.com/gutenberg-labo/gl-dancingmen
