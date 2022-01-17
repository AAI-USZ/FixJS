function( e ) {
				context.fn.saveCursorAndScrollTop();
				// No dragging!
				e.preventDefault();
				return false;
			}