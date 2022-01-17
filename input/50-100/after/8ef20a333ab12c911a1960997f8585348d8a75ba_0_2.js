function addAttributeButtonCallback() {
			if ($(this).hasClass("disabled"))
				return;
			var data = $(this).data('mods');
			createAttribute(data.attribute, data.parentXPath, data.parentId);
			$(this).addClass("disabled");
		}