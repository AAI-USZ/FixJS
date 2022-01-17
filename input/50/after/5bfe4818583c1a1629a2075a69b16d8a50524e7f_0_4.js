function init(context) {
				if(provide) {
					return when(wire(provide), function(provides) {
						safeMixin(context.components, provides);
					});
				}
			}