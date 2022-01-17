function(data, dataType){
				if(!data){ console.error("error."); return; }				
				var newview = _createTplView(data);
				if(callback){
					callback(newview);
				}
			}