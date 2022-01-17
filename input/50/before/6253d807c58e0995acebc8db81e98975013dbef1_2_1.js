function(mid){
				return has("dojo-sync-loader") ? require.isXdUrl(require.toUrl(mid + ".js")) : true;
			}