function (manifest) {
				if (manifest.meta && manifest.meta.icon) {
					appendLink('apple-touch-icon', manifest.meta.icon, null);					
				}
				if (manifest.meta && manifest.meta.splash) {
					appendLink('apple-touch-startup-image', manifest.meta.splash, null);					
				}		
				
				function complete(src) {
					var splash = new Element('img');
					splash.id = 'f5splash';
					splash.setAttribute('src', src);
					document.body.appendChild(splash);															
					cb();																			
				}
				if (manifest.meta && manifest.meta.splash) {
					if (bool(query.inline)) {
						inlineData(pkg, pkgBase + manifest.meta.splash, cb, function (data) {
							complete(data);
						});													
					} else {
						complete(manifest.meta.splash);
					}
				} else {
					cb();
				}											
			}