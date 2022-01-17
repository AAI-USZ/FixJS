function(fileName) {
					var data;
					console.log("Attempting to open " + fileName);
					if (data != null) {
						_this.model["import"](data);
						return localStorage.setItem("StrutLastPres", fileName);
					};
				}