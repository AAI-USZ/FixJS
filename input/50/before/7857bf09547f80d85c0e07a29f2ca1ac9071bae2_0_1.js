function(err, xtagJson){
					if (xtagJson) xtagJson.controlLocation = path.join(ghData.branchUrl, tagUrl);
					onComplete(err, xtagJson);
				}