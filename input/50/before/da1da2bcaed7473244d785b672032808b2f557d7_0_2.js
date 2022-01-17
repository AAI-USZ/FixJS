function(jqXHR, status, e){
					console.group("AJAX QUERY RESULTS:");
					console.error("Error while sending data to "+sUrl);
					console.log(status+": "+e);
					console.groupEnd();
				}