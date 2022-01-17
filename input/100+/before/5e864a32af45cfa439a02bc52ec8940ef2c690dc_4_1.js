function() {
		var val = $('#server_search_input').val();
		var url = TissueStack.Utils.verifyUrlSyntax(val);
		if (!url) {
			alert("You entered an invalid url!");
			return;
		}
		
		if (typeof(window.location.hostname) == "string" && val.indexOf(window.location.hostname) >=0) {
			alert("Your local instance's configuration is already in the list!");
			return;
		}
		
		$('#server_search_input').val(url);
		
		// get the actual host/domain name
		var domain = TissueStack.Utils.extractHostNameFromUrl(val);
		if (!domain) {
			alert("Could not read domain from url");
			return;
		}
		// replace . with _
		domain = domain.replace(/[.]/g,"_");
		
		if (url.substring(url.length-1) != '/') {
			url += "/";
		}
		
		url += "backend/data/list?include_plane_data=true";
		
		// contact server
		$.ajax({
			url : url,
			dataType : "json",
			cache : false,
			timeout : 30000,
			success: function(data, textStatus, jqXHR) {
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
					alert("No data sets found in configuration database");
					return;
				}
				
				var dataSets = data.response;
				
				for (var x=0;x<dataSets.length;x++) {
					var addedDataSet = TissueStack.dataSetStore.addDataSetToStore(dataSets[x], domain);
					if (addedDataSet) {
						if(TissueStack.desktop){
							TissueStack.dataSetNavigation.addDataSetToDynaTree(addedDataSet);
						}
						if (TissueStack.tablet || TissueStack.phone){
							TissueStack.dataSetNavigation.addDataSetToTabletTree(addedDataSet);
						}
					}
				}
			},
			error: function(jqXHR, textStatus, errorThrown) {
				alert("Error connecting to backend: " + textStatus + " " + errorThrown);
			}
		});
		
	}