function() {
		// we do this one synchronously
		TissueStack.Utils.sendAjaxRequest(
			"http://" + this.domain + "/backend/configuration/all/json", 'GET', false,		
			function(data, textStatus, jqXHR) {
				if (!data.response && !data.error) {
					alert("Did not receive anyting, neither success nor error ....");
					return;
				}
				
				if (data.error) {
					var message = "Application Error: " + (data.error.message ? data.error.message : " no more info available. check logs.");
					alert(message);
					return;
				}
				
				if (data.response.noResults) {
					alert("No configuration info found in database");
					return;
				}
				var configuration = data.response;
				
				for (var x=0;x<configuration.length;x++) {
					if (!configuration[x] || !configuration[x].name || $.trim(!configuration[x].name.length) == 0) {
						continue;
					}
					TissueStack.configuration[configuration[x].name] = {};
					TissueStack.configuration[configuration[x].name].value = configuration[x].value;
					TissueStack.configuration[configuration[x].name].description = configuration[x].description ? configuration[x].description : "";
				};
			},
			function(jqXHR, textStatus, errorThrown) {
				alert("Error connecting to backend: " + textStatus + " " + errorThrown);
			}
		);
	}