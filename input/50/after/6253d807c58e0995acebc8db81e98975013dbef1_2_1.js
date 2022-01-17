function(){
					if(!--remaining){
						load(lang.delegate(cache[loadTarget]));
					}
				}