package com.xerini.interview.server

import com.typesafe.config.Config
import com.xerini.interview.server.api.GeoJsonService
import org.eclipse.jetty.server.Handler
import org.eclipse.jetty.servlet.DefaultServlet
import org.eclipse.jetty.servlet.ServletContextHandler
import org.eclipse.jetty.servlet.ServletHolder
import org.eclipse.jetty.util.resource.Resource
import org.glassfish.jersey.server.ResourceConfig
import org.glassfish.jersey.servlet.ServletContainer

object ServerHandler {

    @Suppress("UNUSED_PARAMETER")
    fun configure(config: Config): Handler {
        val handler = ServletContextHandler()

        addStaticContent("/*", handler)
        addApiLayer("/api/*", handler)

        return handler
    }

    @Suppress("SameParameterValue")
    private fun addApiLayer(path: String, handler: ServletContextHandler) {
        val resourceConfig = ResourceConfig()
        resourceConfig.register(GsonJerseyProvider::class.java)
        resourceConfig.register(GeoJsonService(), 0)

        handler.addServlet(ServletHolder(ServletContainer(resourceConfig)), path)
    }

    @Suppress("SameParameterValue")
    private fun addStaticContent(path: String, handler: ServletContextHandler) {
        val staticContentServletHolder = ServletHolder(DefaultServlet::class.java)
        staticContentServletHolder.setInitParameter("dirAllowed", "false")
        handler.addServlet(staticContentServletHolder, path)

        handler.baseResource = Resource.newResource("./ui")
    }
}