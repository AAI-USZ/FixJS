function init(components) {
				if(provide) {
					return when(wire(provide), function(provides) {
						safeMixin(components, provides);
					});
				}
			}