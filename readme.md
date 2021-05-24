##Xerini Interview Exercise

###Build Instructions

This project provides a simple server-side component built in Kotlin and a front-end
component built in React-JS/Typescript. 

To build the whole project, including the front-end, execute the following gradle command:

```
$ gradlew clean build
```

To build just the front end, execute the following commands (note you'll need the latest version of node/npm from https://nodejs.org/en/)

```
$ cd ./ui
$ npm install
$ npm run-script build
```

To start the app, run the main function located in class `com.xerini.interview.App`

This will start the app and will serve the UI at http://localhost:7080/

###Brief

The current UI features a basic map based on the [OpenLayers](https://openlayers.org/) library.
The back-end features two REST endpoints that are defined in `com.xerini.interview.server.api.GeoJsonService`

The endpoint `GET /geo-json` is expected to return [GeoJson](https://en.wikipedia.org/wiki/GeoJSON) data to the front-end.

The endpoint `POST /geo-json/add` is expected to receive coordinates for a single point and persist these such that they are returned by subsequent calls to the `GET` endpoint

The first task is to add implementations for these two endpoints so that new data points can be added and then returned to the front-end. An in-memory persistence solution is fine for the purposes of this exercise.

The second task is to implement the function `onMapClick` in the file `ui/src/map-view.tsx` so that when the user clicks on the map, the location is stored in the rest API and the map data refreshed so that the updated point is displayed on the map.