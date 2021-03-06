# Project setup

A few steps are required to setup this project but it shouldn't take long.

All commands mentioned should be ran from the project root.

## Prerequisite Software

* [Git](http://git-scm.com) and/or the **GitHub app** (for [Mac](http://mac.github.com) or [Windows](http://windows.github.com)).
* [Node.js](http://nodejs.org), (version `>=4.2.1` `<5`). It should include [npm](https://www.npmjs.com/) (node package manager).

## Getting started

### 1. Install packages
All packages for this project are stored in the [package.json](https://github.com/SteveVanOpstal/LegendBuilder/blob/master/package.json) file 
and can be retrieved by executing following command:
```
npm install
```

### 2. Configuration (optional)
A few servers are set up for this project and the settings for them are available in the `src/server/.settings.json` file.
It could contain the following:
```
{
  "httpServer": {
    "host: "10.10.10.10",
    "port: 8000
  },
  "staticServer": {
    "host": "10.10.10.10",
    "port": 8001
  },
  "matchServer" : {
    "host": "10.10.10.10",
    "port": 8002
  }
}
```

### 3. Setup node servers
This project runs two servers to retrieve data from the [Riot Games API](https://developer.riotgames.com/).
This is a guide on how to set them up.

#### 3.1 Create `.api.key`
Create an account at [developer.riotgames.com](https://developer.riotgames.com/). Now you automagically have an api key.
Create a file named `.api.key` and add the key to it. Place it at the root of the project.

#### 3.3 Run
```
npm run static-server
npm run match-server
```

### 4. Run a HTTP server (webpack-dev-server)
In development I recommend the [webpack-dev-server](https://github.com/webpack/webpack-dev-server).

#### 4.1 Install
```
npm install -g webpack-dev-server
```

#### 4.2 Run
```
npm run server
```

## Visual Studio Code
I highly recommend the [Visual Studio Code](https://code.visualstudio.com/) IDE. 

It works well with for example npm, by adding following `tasks.json` you can call the npm `build` task via `Ctrl+Shift+B`:

```JSON
{
  "version": "0.1.0",
  "command": "npm run",
  "isShellCommand": true,
  "showOutput": "silent",
  "tasks": [
    {
      "taskName": "build",
      "args": [],
      "isBuildCommand": true,
      "problemMatcher": "$tsc"
    }
  ]
}
```

## Reddit Release
Every release a python script will generate a post on reddit. To improve this script or to create new scripts the following software is required:

* [Python](https://www.python.org/downloads/), (version `>=3.5.1`). It should include [pip](https://pypi.python.org/pypi/pip) (Pip Installs Packages). 
  * [praw](https://praw.readthedocs.org) (`pip install praw`)

`src/reddit/.settings.json`:
```
{
  "SUBREDDIT": "LegendBuilder",
  "REDDIT_USERNAME": "LookAtMeImRedditNow",
  "REDDIT_PASSWORD": "LegendBuilderDaBest"
}
```