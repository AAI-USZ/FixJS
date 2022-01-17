function addElementButton(element, parentXPath, parentId, buttonContainer) {
			var button = $('<span/>').data('mods', {
				'element': element,
				'parentXPath': parentXPath,
				'parentId': parentId
			}).html(element.title).appendTo(buttonContainer);
			button.click(addElementButtonCallback);
		}