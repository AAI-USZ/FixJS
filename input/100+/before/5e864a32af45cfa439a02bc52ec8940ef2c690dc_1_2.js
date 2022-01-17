function(host, id, customSuccessHandler) {
		if (!host) {
			host = "localhost";
		}
		var url = (host == 'localhost' ? "" : "http://" + host) + "/backend/data";
		if (!id && host == "localhost") {
			url += "/list?include_plane_data=true";
		} else if (!id && host != "localhost") {
			url += "/list";
		} else if (id) {
			url += ("/" + id);
		}
		
		_this = this;
		
		$.ajax({
			url : url,
			cache : false,
			timeout : 30000,
			dataType : "json",
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
					_this.addDataSetToStore(dataSets[x], "localhost");
				}

				if (customSuccessHandler) {
					customSuccessHandler();
				}
			},
			error: function(jqXHR, textStatus, errorThrown) {
				alert("Error connecting to backend: " + textStatus + " " + errorThrown);
			}
		});
	}