import * as React from "react"
import {useEffect, useState} from "react"
import {Feature, Map, MapBrowserEvent, View} from "ol";
import {fromLonLat} from "ol/proj";
import TileLayer from "ol/layer/Tile";
import {Cluster, OSM, Vector} from "ol/source";

import "ol/ol.css";
import {FeatureLike} from "ol/Feature";
import VectorLayer from "ol/layer/Vector";
import {GeoJSON} from "ol/format";
import {Icon, Style} from "ol/style";

const geoJson = new GeoJSON()

const mapPinStyle = new Style({
    image: new Icon({
        src: "/img/map-pin-blue.png",
        scale: 25 / 50,
        anchor: [0.5, 1.0]
    })
});

export const MapView: React.FC = () => {
    const [map, setMap] = useState<Map | undefined>(undefined)
    const [featureLayer, setFeatureLayer] = useState<VectorLayer | undefined>()
    const [features, setFeatures] = useState<FeatureLike[]>([])

    useEffect(() => {
        const map = new Map({
            target: "map",
            layers: [
                new TileLayer({
                    source: new OSM()
                })
            ],
            view: new View({
                center: fromLonLat([-0.023758, 51.547504]),
                zoom: 13,
                minZoom: 6,
                maxZoom: 18
            })
        })
        map.on("click", onMapClick);

        setMap(map)
        loadFeatureData()
    }, [])

    useEffect(() => {
        if (map) {
            setFeatureLayer(addFeatureLayer(featureLayer, features))
        }
    }, [map, features])

    const loadFeatureData = () => {
        fetch("/api/geo-json")
            .then(response => response.json())
            .then(json => setFeatures(geoJson.readFeatures(json)))
    }

    const addFeatureLayer = (previousLayer: VectorLayer, features: FeatureLike[]): VectorLayer => {
        const newLayer = previousLayer ? previousLayer : new VectorLayer({
            style: mapPinStyle
        });

        if (previousLayer != undefined) {
            previousLayer.getSource().clear();
        } else {
            map.addLayer(newLayer);
        }

        (newLayer as any).tag = "features";

        const source = new Vector({
            format: geoJson,
            features: features as Feature<any>[]
        });

        newLayer.setSource(source);

        return newLayer
    }

    const onMapClick = (e: MapBrowserEvent) => {
        //TODO Implement this method
    }

    return <div>
        <div id="map" style={{height: "500px", width: "500px"}}/>
    </div>
}