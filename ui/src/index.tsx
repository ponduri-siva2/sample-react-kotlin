import * as React from "react";
import * as ReactDOM from "react-dom";
import {MapView} from "./map-view";

if (document.getElementById("react-app")) {
    ReactDOM.render(<MapView/>, document.getElementById("react-app"));
}