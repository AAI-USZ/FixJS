function( text ) {
						// Make sure we got some text back.
						checkText(text, url);
						d.resolve(type.renderer(id, text))
						// Cache if if we are caching.
						if ( $view.cache ) {
							$view.cached[id] = d;
						}
						
					}