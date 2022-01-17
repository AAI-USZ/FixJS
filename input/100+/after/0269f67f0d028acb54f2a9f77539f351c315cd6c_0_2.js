function(bundle){
					if(locale == targetLocale){
						targetBundle = bundle;
					}
					if(!--remaining){
						load(targetBundle);
					}
				}