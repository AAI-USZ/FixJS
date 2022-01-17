function(json) {
            var villo = json.Villo;
            
            if(villo.length <= 0) {
                return undefined;
            }
            
            for(var i in villo) {
                villo[i].distance = Math.round(parseInt(villo[i].distance)/10)*10;
				villo[i].name = jQuery.trim(villo[i].name);
            }
            
            return villo;
		}