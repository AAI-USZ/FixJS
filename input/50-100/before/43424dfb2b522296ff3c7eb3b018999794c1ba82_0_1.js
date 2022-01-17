function(json) {
            var velo = json.Velo;
            
            if(velo.length <= 0) {
                return undefined;
            }
            
            for(var i in velo) {
                velo[i].distance = Math.round(parseInt(velo[i].distance)/10)*10;
            }
            
            return velo;
		}