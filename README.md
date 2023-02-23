# Acclaimed CSS

Critical CSS for everyone!

## Installation

```bash
npm install acclaimed
```

```bash
yarn add acclaimed
```

## Usage

Create a new script file, include `acclaimed` package and run the `acclaimed.critical()` function.

```js
const acclaimed = require('acclaimed')

acclaimed.critical()
```

## Configuration

Acclaimed CSS uses `.acclaimed.json` file to read the config. The example is shown below.

```json
[{
  "css": "https://www.silvestar.codes/css/style.css",
  "out": "home.min.css",
  "url": "https://www.silvestar.codes/",
  "width": 1920,
  "height": 1800,
  "keepLargerMediaQueries": true,
  "strict": false,
  "blockJSRequests": true,
  "renderWaitTime": 300,
  "timeout": 60000,
  "forceExclude": ["@font-face"],
  "phantomJsOptions": {
    "ssl-protocol": "any",
    "ignore-ssl-errors": true
  }
},{
  "css": "https://www.silvestar.codes/css/style.css",
  "out": "portfolio.min.css",
  "url": "https://www.silvestar.codes/portfolio/",
  "width": 1920,
  "height": 1800,
  "keepLargerMediaQueries": true,
  "strict": false,
  "blockJSRequests": true,
  "renderWaitTime": 300,
  "timeout": 60000,
  "forceExclude": ["@font-face"],
  "phantomJsOptions": {
    "ssl-protocol": "any",
    "ignore-ssl-errors": true
  }
}]
```

[All options are visible on the Penthouse site](https://github.com/pocketjoso/penthouse#options).

## Tutorial

https://www.silvestar.codes/articles/how-to-use-acclaimed-package-to-extract-critical-css/
