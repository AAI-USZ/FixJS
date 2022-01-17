function addAttributeButton(attribute, parentXPath, parentId, buttonContainer) {
			var button = $('<span/>').attr({
				'id' : parentId + "_" + attribute.title + "_btn"
			}).data('mods', {
				'parentId': parentId,
				'attribute': attribute,
				'parentXPath': parentXPath
			}).html(attribute.title).appendTo(buttonContainer);
			button.click(addAttributeButtonCallback);
			return button;
		}