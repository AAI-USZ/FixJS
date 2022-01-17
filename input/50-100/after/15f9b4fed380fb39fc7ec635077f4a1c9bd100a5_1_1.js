function( text, d ) {
				// Get the renderer function.
				var func = type.renderer(id, text);
				d = d || new can.Deferred();
				
				// Cache if we are caching.
				if ( $view.cache ) {
					$view.cached[id] = d;
					d.__view_id = id;
					$view.cachedRenderers[id] = func;
				}
				d.resolve(func);
				// Return the objects for the response's `dataTypes`
				// (in this case view).
				return d;
			}