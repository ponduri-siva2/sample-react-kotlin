package com.xerini.interview.server


import com.xerini.interview.util.GsonUtil
import org.slf4j.LoggerFactory
import java.io.IOException
import java.io.InputStream
import java.io.InputStreamReader
import java.io.OutputStream
import java.io.OutputStreamWriter
import java.lang.reflect.Type

import javax.ws.rs.Consumes
import javax.ws.rs.Produces
import javax.ws.rs.WebApplicationException
import javax.ws.rs.core.MediaType
import javax.ws.rs.core.MultivaluedMap
import javax.ws.rs.ext.MessageBodyReader
import javax.ws.rs.ext.MessageBodyWriter
import javax.ws.rs.ext.Provider

@Provider
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)

class GsonJerseyProvider : MessageBodyWriter<Any>, MessageBodyReader<Any> {

    private val logger = LoggerFactory.getLogger(javaClass)

    override fun isReadable(type: Class<*>?, genericType: Type?, annotations: Array<out Annotation>?, mediaType: MediaType?): Boolean {
        return true
    }

    @Throws(IOException::class)
    override fun readFrom(type: Class<Any>, genericType: Type,
                          annotations: Array<Annotation>, mediaType: MediaType,
                          httpHeaders: MultivaluedMap<String, String>, entityStream: InputStream): Any? {
        val streamReader = InputStreamReader(entityStream,
                UTF_8)
        try {
            return GsonUtil.gson.fromJson(streamReader, genericType)
        } catch (e: com.google.gson.JsonSyntaxException) {
            logger.error("Error reading json", e)
        } finally {
            streamReader.close()
        }
        return null
    }

    override fun isWriteable(type: Class<*>, genericType: Type,
                             annotations: Array<Annotation>, mediaType: MediaType): Boolean {
        return true
    }

    override fun getSize(`object`: Any?, type: Class<*>?, genericType: Type?,
                         annotations: Array<Annotation>?, mediaType: MediaType?): Long {
        return -1
    }

    @Throws(IOException::class, WebApplicationException::class)
    override fun writeTo(`object`: Any, type: Class<*>, genericType: Type,
                         annotations: Array<Annotation>, mediaType: MediaType,
                         httpHeaders: MultivaluedMap<String, Any>,
                         entityStream: OutputStream) {
        val writer = OutputStreamWriter(entityStream, UTF_8)
        writer.use { w ->
            GsonUtil.gson.toJson(`object`, genericType, w)
        }
    }

    companion object {
        private const val UTF_8 = "UTF-8"
    }
}