package com.xerini.interview.server.api

import javax.ws.rs.GET
import javax.ws.rs.POST
import javax.ws.rs.Path
import javax.ws.rs.Produces
import javax.ws.rs.core.MediaType.APPLICATION_JSON
import javax.ws.rs.core.Response

@Path("formData")
@Produces(APPLICATION_JSON)
class FieldResource {
    private var formData = mutableMapOf<String, String>()

    init {
        println("static block to initialize the data")
        formData["field1"] = "";
        formData["field2"] = "";
        formData["field3"] = "";
        formData["field4"] = "";
        formData["field5"] = "";
        formData["field6"] = "";
    }

    @GET
    fun getGeoJson(): MutableMap<String, String> {
        return  formData;
    }

    @Path("/add")
    @POST
    fun addPoint(inputData: DataForm): Response {
        formData["field1"] = inputData.field1;
        formData["field2"] = inputData.field2;
        formData["field3"] = inputData.field3;
        formData["field4"] = inputData.field4;
        formData["field5"] = inputData.field5;
        formData["field6"] = inputData.field6;
        return  Response.ok().build();
    }
}

data class DataForm(val field1: String, val field2: String, val field3: String,
val field4: String, val field5: String, val field6: String);