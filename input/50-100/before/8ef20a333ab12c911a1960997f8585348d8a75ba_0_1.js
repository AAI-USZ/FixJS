function addAttributeButton(attribute, parentXPath, parentId, buttonContainer) {
			var button = $('<span/>').attr({
				'id' : parentId + "_" + attribute.title + "_btn"
			}).html(attribute.title).appendTo(buttonContainer);
			button.on('click', addAttributeButtonCallback(attribute, parentXPath, parentId));
			return button;
		}