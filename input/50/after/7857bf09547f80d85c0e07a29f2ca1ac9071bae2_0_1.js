function(err, xtagJson){
					if (xtagJson) xtagJson.controlLocation = ghData.branchUrl + "/" + tagUrl;
					onComplete(err, xtagJson);
				}