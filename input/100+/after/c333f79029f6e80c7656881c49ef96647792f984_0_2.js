function (manifest) {
				if (manifest.meta && manifest.meta.title) {
					var title = new Element('title');
					title.innerHTML = manifest.meta.title;
					document.head.appendChild(title);
				}				
				
				if (manifest.meta && manifest.meta.icon) {
					appendLink('apple-touch-icon', manifest.meta.icon, null);					
				}
				if (manifest.meta && manifest.meta.splash) {
					appendLink('apple-touch-startup-image', manifest.meta.splash, null);					
				}		
				
				function complete(src) {
					document.body.setAttribute('style', 'background-image: url(' + src + '); background-size: cover;');
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