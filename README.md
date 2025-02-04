# RU-MAP

<a href="https://www.npmjs.com/package/ru-map">
    <img 
        src="https://img.shields.io/npm/v/ru-map.svg?style=flat-square&colorB=51C838"
        alt="NPM Version"
    />
</a>
<a href="https://github.com/iamkun/dayjs/blob/master/LICENSE">
    <img
        src="https://img.shields.io/badge/license-MIT-brightgreen.svg?style=flat-square" alt="License"
    />
</a>

### [English](./README.md) | [Русский](./docs/README_RU.md)

RU-MAP is a lightweight library for web applications, without third-party dependencies.<br/>
Contains an svg map of Russia, with the following capabilities:
1) Region selecting
2) Selecting of the federal district
3) Selecting a time zone (with information about the difference from UTC+0 in minutes)

![Image](./docs/Preview.png)

## Getting started
Install npm package using command:
```sh
$ npm i ru-map
```

And add to your project:
```typescript
import { RUMap, type Region } from 'ru-map';

const idRootHTMLElement = 'ru-map-root';

const map = new RUMap(idRootHTMLElement, { 
    mode: 'region',
    locale: 'en',
    onRegionClick: (value: Region) => {
        // your code here
    }, 
});
```
The region interface contains:
```typescript
export interface Region {
    id: string; // region id
    title: string; // region name 'en' || 'ru'
    federalDistrict: string; // district of region 'en' || 'ru'
    timezone: string; // region time zone 'en' || 'ru'
    timezoneOffset: number; // offset from UTC+0 in minutes
}
```

## Development

### Requirements
To install and run the project, you need:<br/>
[NodeJS](https://nodejs.org/) v20+.<br/>
[NPM](https://www.npmjs.com/) v10+.

### Installing dependencies
To install dependencies, run the command:
```sh
$ npm i
```

### Launching the Development server
To start the development server, run the command:
```sh
npm run dev
```

### Creating a build
To run a production build, run the command:
```sh
npm run build
```

## Contributing
Thank you for taking the time to read our rules for contributing to ru-map. You can start contributing in many ways, such as filing bug reports, improving code and documentation, or helping others.

Our open source community strives to be pleasant, welcoming, and professional. Abusive, harassing or otherwise inappropriate behavior will not be tolerated.

### Pull Request
* ru-map is written in ES6.
* We use ESLint to test our code. You can use `npm run lint:fix` before submitting a pull request.
* Please use a semantic commit message.

### Bugs
* Before submitting a bug report, look for similar tickets. Your problem may have already been discussed and resolved.
* Feel free to add comments to an existing issue, even if it is closed.
* Be careful when choosing a title and report, do not miss important details.
* In English, please.
