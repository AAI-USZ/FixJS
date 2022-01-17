function(/*String*/bundlePrefix, /*Array*/localesGenerated, /*boolean*/ guaranteedAmdFormat){
			//	summary:
			//		Load built, possibly-flattened resource bundles, if available for all
			//		locales used in the page.
			//
			//  descirption:
			//		Only called by built layer files. The entire locale hierarchy is loaded. For example,
			//		if locale=="ab-cd", then ROOT, "ab", and "ab-cd" are loaded. This is different than v1.6-
			//		in that the v1.6- would lonly load ab-cd...which was *always* flattened.
			//
			//		If guaranteedAmdFormat is true, then the module can be loaded with require thereby circumventing the detection algorithm
			//		and the extra possible extra transaction.
			//


			function forEachLocale(locale, func){
				// this function is equivalent to v1.6 dojo.i18n._searchLocalePath with down===true
				var parts = locale.split("-");
				while(parts.length){
					if(func(parts.join("-"))){
						return true;
					}
					parts.pop();
				}
				return func("ROOT");
			}

			function preload(locale){
				locale = normalizeLocale(locale);
				forEachLocale(locale, function(loc){
					if(array.indexOf(localesGenerated, loc)>0){
						var mid = bundlePrefix.replace(/\./g, "/")+"_"+loc;
						preloading++;
						(isXd(mid) || guaranteedAmdFormat ? require : syncRequire)([mid], function(){
							--preloading;
							while(!preloading && preloadWaitQueue.length){
								load.apply(null, preloadWaitQueue.shift());
							}
						});
						return true; // Boolean
					}
					return false; // Boolean
				});
			}

			preload();
			array.forEach(dojo.config.extraLocale, preload);
		}