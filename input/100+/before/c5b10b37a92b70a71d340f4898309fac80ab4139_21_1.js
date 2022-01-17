function(e){

				var snapshotIds = e.snapshotVersionIds;
				var lastVersionId = e.lastVersionId;

				if(arguments.length === 0){
					cb();
				}else{
					var key;

					if(s.isView){
						key = '';
						for(var i=0;i<params.length;++i){
							if(i > 0) key += ';';
							key += querystring.escape(params[i]);
						}
					}else{
						key = params+'';
					}
				
					var paths = [];
					for(var i=0;i<snapshotIds.length;++i){
						var id = snapshotIds[i];
						var previousId = i > 0 ? snapshotIds[i-1] : -1;
						paths.push(cc.serverInstanceUid() + '/' + viewCode + '/' + id + '/' + previousId + '/' + key);
					}
				
					//cc.makeSyncId(function(syncId){
						cb(snapshotIds, paths, lastVersionId);
					//});
				}
			}