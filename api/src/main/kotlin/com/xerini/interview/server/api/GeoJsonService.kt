@file:Suppress("unused")

package com.xerini.interview.server.api

import java.util.concurrent.CopyOnWriteArrayList
import javax.ws.rs.*
import javax.ws.rs.core.MediaType.APPLICATION_JSON
import javax.ws.rs.core.Response

@Path("/geo-json")
class GeoJsonService {
    private val allCoordinates = CopyOnWriteArrayList<List<Double>>()

    @GET
    @Produces(APPLICATION_JSON)
    fun getGeoJson(): GeoJsonObject {
        TODO("Implement this method")
    }

    @Path("/add")
    @POST
    @Consumes(APPLICATION_JSON)
    fun addPoint(coordinates: List<Double>): Response {
        TODO("Implement this method")
    }
}

data class GeoJsonObject(val features: List<GeoJsonFeature>) {
    val type: String = "FeatureCollection"
}

data class GeoJsonFeature(val geometry: GeometryData?, val properties: Map<String, Any?> = emptyMap()) {
    val type: String = "Feature"
}

data class GeometryData(val coordinates: List<Double>) {
    val type: String = "Point"
}