function(res){
						if (typeof success == "function"){
							success( __self.db, _version, result.systemPath);
						}
					}