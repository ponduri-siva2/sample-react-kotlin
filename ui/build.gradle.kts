import org.apache.tools.ant.taskdefs.condition.Os

val npmInstall = task<Exec>("npmInstall") {
    workingDir = File(".")
    if (Os.isFamily(Os.FAMILY_WINDOWS)) {
        commandLine = listOf("npm.cmd", "install")
    } else {
        commandLine = listOf("npm", "install")
    }
}

val buildFrontEnd = task<Exec>("buildFrontEnd") {
    workingDir = File(".")
    if (Os.isFamily(Os.FAMILY_WINDOWS)) {
        commandLine = listOf("npm.cmd", "run-script", "build")
    }
    else {
        commandLine = listOf("npm", "run-script", "build")
    }
}.dependsOn(npmInstall)

project(":api").tasks["jar"].dependsOn(buildFrontEnd)