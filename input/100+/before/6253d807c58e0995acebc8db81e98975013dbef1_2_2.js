function(id, require, load){
			// note: id is always absolute

			if(waitForPreloads(id, require, load)){
				return;
			}
			var
				match= nlsRe.exec(id),
				bundlePath= match[1] + "/",
				bundleName= match[5] || match[4],
				bundlePathAndName= bundlePath + bundleName,
				localeSpecified = (match[5] && match[4]),
				targetLocale=  localeSpecified || dojo.locale,
				target= bundlePathAndName + "/" + targetLocale;

			if(localeSpecified){
				checkForLegacyModules(target);
				if(cache[target]){
					// a request for a specific local that has already been loaded; just return it
					load(cache[target]);
				}else{
					// a request for a specific local that has not been loaded; load and return just that locale
					doLoad(require, bundlePathAndName, bundlePath, bundleName, targetLocale, load);
				}
				return;
			}// else a non-locale-specific request; therefore always load dojo.locale + config.extraLocale

			// notice the subtle algorithm that loads targetLocal last, which is the only doLoad application that passes a value for the load callback
			// this makes the sync loader follow a clean code path that loads extras first and then proceeds with tracing the current deps graph
			var extra = config.extraLocale || [];
			extra = lang.isArray(extra) ? extra : [extra];
			extra.push(targetLocale);
			var remaining = extra.length,
				targetBundle;
			array.forEach(extra, function(locale){
				doLoad(require, bundlePathAndName, bundlePath, bundleName, locale, function(bundle){
					if(locale == targetLocale){
						targetBundle = bundle;
					}
					if(!--remaining){
						load(targetBundle);
					}
				});
			});
		}