function generateAddon() {
	var pluginName = nameInput.value;
	if (pluginName === "") {
		alert("The plugin name must not be blank.");
		throw new Error();
	}
	var pluginVersion = versionInput.value;
	if (pluginVersion === "") {
		alert("No plugin version was entered: using 1.0.0");
		pluginVersion = "1.0.0";
	}
	var pluginAuthor = authorInput.value;
	if (pluginAuthor === "") {
		alert("The author name must not be blank.");
		throw new Error();
	}
	var pluginMode = "startup"; //FIXME
	var pluginPlatform = "BOTH"; //FIXME
	var pluginDescription = descriptionInput.value;
	var packageName = packageInput.value;
	if (packageName === "") {
		alert("The package name must not be blank.");
		throw new Error();
	}
	if (packageName.toLowerCase() !== packageName) {
		var fixItForMe = confirm("Normally, Java package names should be in lowercase.\n" + 
			"Your package name contains uppercase letters.\n" + 
			"\nWould you like your package name to be changed to " + packageName.toLowerCase() + "?");
		if (fixItForMe) {
			packageName = packageName.toLowerCase();
		}
	}
	if (packageName.indexOf(".") === -1) {
		alert("There must be at lease one dot in the package name.");
		throw new Error();
	}
	var mainClassName = mainClassInput.value;
	if (mainClassName === "") {
		alert("The main class name must not be blank.");
		throw new Error();
	}
	if (mainClassName.substring(0, 1) !== mainClassName.substring(0, 1).toUpperCase()) {
		var fixResult = mainClassName.substring(0, 1).toUpperCase() + mainClassName.substring(1);
		var fixItForMe = confirm("Normally, the first letter of a Java class's name should be in uppercase.\n" +
			"Would you like your main class name to be changed to " + fixResult + "?");
		if (fixItForMe) {
			mainClassName = fixResult;
		}
	}


	var mainClassFileContent = generateMainClassFile(packageName, mainClassName);
	//alert(mainClassFileContent);
	var addonYamlFileContent = generateAddonYaml(pluginName, pluginVersion, pluginAuthor, 
	pluginDescription, packageName, mainClassName, pluginMode, pluginPlatform);
	//alert(addonYamlFileContent);
	var addonPomFileContent = generateAddonPom(pluginName, packageName);
	//alert(addonPomFileContent);

	var zip = new JSZip();
	zip.file(pluginName + "/src/main/java/" + packageName.replace(/\./g, "/") + "/" + mainClassName + ".java", 
		mainClassFileContent);
	zip.file(pluginName + "/src/main/resources/properties.yml", addonYamlFileContent);
	zip.file(pluginName + "/pom.xml", addonPomFileContent);
	return zip.generate();
}