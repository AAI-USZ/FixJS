function(e) {
			// If the layer is visible and the event target is not the
			// button itself or a descendant of the button, hide the
			// layer.
			if (that.visible && !(e.target === that.get('target')[0] || jQuery.contains(that.get('target')[0], e.target))) {
				debugger;
				that.hide();
			}
		}