function(fileName){
			var _this = this;
			_this.dataFilePath = (fileName && lang.trim(fileName).length > 0) ? fileName : this.dataFilePath;
			try {
				var td = request.post(_this.saveProgramPath, {
					query: {filename: _this.dataFilePath, data: JSON.stringify(_this.getJSONData())},
				}).response.then(function(response){
					if((util.checkStatus(response.options.status))||
						(response.options.status == 405)
					){
						console.log("Successfully! Saved data to " + _this.dataFilePath);
					}else{
						console.log("Failed! Saved error");
					}
				});
			} catch(e){
				console.log("exception: " + e.message);
			}
		}