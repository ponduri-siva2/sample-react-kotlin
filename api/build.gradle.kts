plugins {
    java
    kotlin("jvm") version "1.4.10"
}

dependencies {
    implementation("org.slf4j:slf4j-api:1.7.30")
    implementation("ch.qos.logback:logback-core:1.2.3")
    implementation("ch.qos.logback:logback-classic:1.2.3")
    implementation("com.typesafe:config:1.4.1")
    implementation("org.eclipse.jetty:jetty-server:9.4.34.v20201102")
    implementation("org.eclipse.jetty:jetty-servlet:9.4.34.v20201102")
    implementation("org.glassfish.jersey.core:jersey-common:2.32")
    implementation("org.glassfish.jersey.core:jersey-server:2.32")
    implementation("org.glassfish.jersey.containers:jersey-container-servlet:2.32")
    implementation("org.glassfish.jersey.inject:jersey-hk2:2.32")
    implementation("javax.xml.bind:jaxb-api:2.3.1")
    implementation("org.glassfish.jaxb:jaxb-core:2.3.0.1")
    implementation("com.sun.xml.bind:jaxb-impl:2.3.3")
    implementation("javax.activation:activation:1.1.1")
    implementation("com.google.code.gson:gson:2.8.6")

    testImplementation("org.jetbrains.kotlin:kotlin-test")
    testImplementation("org.jetbrains.kotlin:kotlin-test-junit")
    testImplementation("org.hamcrest:hamcrest:2.2")
}
