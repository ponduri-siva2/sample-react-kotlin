package com.xerini.interview.server.api

import java.util.concurrent.CopyOnWriteArrayList
import javax.ws.rs.*
import javax.ws.rs.core.MediaType.APPLICATION_JSON
import javax.ws.rs.core.Response

@Path("formData")
@Produces(APPLICATION_JSON)
class FieldResource {
    private var formData = mutableMapOf<String, String>()

    @GET
    fun getGeoJson(): MutableMap<String, String> {
        formData["field1"] = "siva@xerini.com";
        formData["field2"] = "7464679584";
        formData["field3"] = "West England";
        formData["field4"] = "Xerini";
        formData["field5"] = "Address1";
        formData["field6"] = "BS32 0HN";
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