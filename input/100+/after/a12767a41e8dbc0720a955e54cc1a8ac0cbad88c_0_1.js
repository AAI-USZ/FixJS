function(result){
			var _version = __self.DATABASE_VERSION + "";
			if (result.status == 1){
				__self.onCreate(function(){
					__self.db.executeSql("PRAGMA user_version='"+_version + "'", function(res){
						if (typeof success == "function"){
							success( __self.db, _version, result.systemPath);
						}
					}, error);
				}, error);
			}
			else {
				if (result.version != _version){
					__self.onUpdate(result.version, function(){
						__self.db.executeSql("PRAGMA user_version='"+_version + "'" , function(res){
							if (typeof success == "function"){
								success( __self.db, _version, result.systemPath);
							}
						}, error);
					}, error);
				}
				else {
					if (typeof success == "function"){ 
						success( __self.db, _version, result.systemPath);
					}
				}
			}
		}