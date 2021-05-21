val npmInstall = task<Exec>("npmInstall") {
    workingDir = File(".")
    commandLine = listOf("npm", "install")
}

val buildFrontEnd = task<Exec>("buildFrontEnd") {
    workingDir = File(".")
    commandLine = listOf("npm", "run-script", "build")
}.dependsOn(npmInstall)

project(":api").tasks["jar"].dependsOn(buildFrontEnd)