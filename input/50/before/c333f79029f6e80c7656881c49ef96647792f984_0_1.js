function complete(src) {
					var splash = new Element('img');
					splash.id = 'f5splash';
					splash.setAttribute('src', src);
					document.body.appendChild(splash);															
					cb();																			
				}