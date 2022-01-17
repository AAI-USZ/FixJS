function addElementButtonCallback() {
			var data = $(this).data('mods');
			createElement(data.element, data.parentXPath, data.parentId);
		}