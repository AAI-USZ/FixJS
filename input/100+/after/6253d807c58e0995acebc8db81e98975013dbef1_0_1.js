function(referenceModule){
				var p, item, match, now;
				for(p in pendingCacheInsert){
					item = pendingCacheInsert[p];
					match = p.match(/^url\:(.+)/);
					if(match){
						cache[toUrl(match[1], referenceModule)] =  item;
					}else if(p=="*now"){
						now = item;
					}else if(p!="*noref"){
						cache[getModuleInfo(p, referenceModule).mid] = item;
					}
				}
				if(now){
					now(createRequire(referenceModule));
				}
				pendingCacheInsert = {};
			}