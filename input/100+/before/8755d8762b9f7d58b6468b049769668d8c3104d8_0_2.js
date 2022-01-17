function generateAddonPom(pluginName, packageName) {
return "<project xmlns=\"http://maven.apache.org/POM/4.0.0\" xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\"" + 
" xsi:schemaLocation=\"http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd\">\n" + 
"	<modelVersion>4.0.0</modelVersion>\n" + 
"	<groupId>" + packageName.substring(0, packageName.lastIndexOf(".")) + "</groupId>\n" + 
"	<artifactId>" + packageName.substring(packageName.lastIndexOf(".") + 1) + "</artifactId>\n" + 
"	<version>dev-SNAPSHOT</version>\n" + 
"	<name>" + pluginName + "</name>\n" + 
"	<description></description>\n" + 
"	<properties>\n" + 
"		<project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>\n" + 
"	</properties>\n" + 
"	<!-- Repository locations -->\n" + 
"	<repositories>\n" + 
"		<repository>\n" + 
"			<id>spout-repo</id>\n" + 
"			<url>http://repo.getspout.org</url>\n" + 
"		</repository>\n" + 
"	</repositories>\n" + 
"	<!--  Dependencies -->\n" + 
"	<dependencies>\n" + 
"		<dependency>\n" + 
"			<groupId>org.getspout</groupId>\n" + 
"			<artifactId>spoutapi</artifactId>\n" + 
"			<version>dev-SNAPSHOT</version>\n" + 
"			<type>jar</type>\n" + 
"			<scope>provided</scope>\n" + 
"		</dependency>\n" + 
"	</dependencies>\n" + 
"	<build>\n" + 
"		<defaultGoal>clean install</defaultGoal>\n" + 
"		<sourceDirectory>${basedir}/src/main/java</sourceDirectory>\n" + 
"		<!-- Resources -->\n" + 
"		<resources>\n" + 
"			<resource>\n" + 
"				<targetPath>.</targetPath>\n" + 
"				<filtering>true</filtering>\n" + 
"				<directory>${basedir}/src/main/resources</directory>\n" + 
"				<includes>\n" + 
"					<include>spoutplugin.yml</include>\n" + 
"				</includes>\n" + 
"			</resource>\n" + 
"		</resources>\n" + 
"		<plugins>\n" + 
"			<plugin>\n" + 
"				<groupId>org.apache.maven.plugins</groupId>\n" + 
"				<artifactId>maven-compiler-plugin</artifactId>\n" + 
"				<version>2.3.2</version>\n" + 
"			</plugin>\n" + 
"			<plugin>\n" + 
"				<groupId>org.apache.maven.plugins</groupId>\n" + 
"				<artifactId>maven-jar-plugin</artifactId>\n" + 
"				<version>2.3.2</version>\n" + 
"			</plugin>\n" + 
"		</plugins>\n" + 
"	</build>\n" + 
"</project>";
}