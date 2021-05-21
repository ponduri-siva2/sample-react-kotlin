package com.xerini.interview

import com.typesafe.config.Config
import com.typesafe.config.ConfigFactory
import com.xerini.interview.server.ServerHandler
import org.eclipse.jetty.server.*
import org.eclipse.jetty.server.handler.ErrorHandler
import org.slf4j.LoggerFactory
import javax.servlet.http.HttpServletRequest
import javax.servlet.http.HttpServletResponse

class App {
    private val logger = LoggerFactory.getLogger(javaClass)

    fun startServer(config: Config): Server {
        val port = config.getInt("app.port")
        logger.info("Starting Jersey server on port $port")
        val server = Server(port)
        server.handler = ServerHandler.configure(config)
        server.start()

        return server
    }
}

fun main() {
    val config = ConfigFactory.defaultApplication()
    val server = App().startServer(config)
    server.join()
}
