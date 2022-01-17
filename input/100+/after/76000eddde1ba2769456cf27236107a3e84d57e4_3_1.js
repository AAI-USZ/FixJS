function(loadObject){
		if (loadObject.instant && loadObject.instant === true) {
			if(villo.store.get("VilloSettingsProp")){
				villo.app.settings = villo.store.get("VilloSettingsProp").settings;
				if(loadObject.callback){
					loadObject.callback(villo.app.settings);
				}
				return villo.app.settings;
			}else{
				if(loadObject.callback){
					loadObject.callback(false);
				}
				return false;
			}
		} else {
			var theTimestamp = villo.store.get("VilloSettingsProp").timestamp;
			villo.storage.get({
				privacy: true,
				title: "VilloSettingsProp",
				callback: function(transit){
					//TODO: Check for the need of this: 
					transit = JSON.parse(JSON.parse(transit));
					if (!transit.storage) {
						//Offline: 
						villo.app.settings = villo.store.get("VilloSettingsProp").settings;
						loadObject.callback(villo.app.settings);
					} else {
						//Check for timestamps.
						if (transit.storage.timestamp > theTimestamp) {
							//Server version is newer. Replace our existing local storage with the server storage.
							villo.store.set("VilloSettingsProp", transit.storage);
							villo.app.settings = transit.storage.settings;
							loadObject.callback(villo.app.settings);
						} else {
							//Local version is newer. 
							//TODO: Update server.
							villo.app.settings = villo.store.get("VilloSettingsProp").settings;
							loadObject.callback(villo.app.setting);
						}
					}
				}
			});
		}
	}