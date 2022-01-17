function getKsFile(pluginName) {
	  	if(!(pluginName == "")) { //User may leave a trailing comma
	  	  consoleLog('Loading add-on "' + pluginName + '"');
		  	var ksURL = addOnLocation + pluginName + "/config.ks";
				$.ajax({
					type: "GET",
					url: ksURL,
					dataType: "text",
					success: function(data) {processKs(data, pluginName);}
				});
			}
	  }