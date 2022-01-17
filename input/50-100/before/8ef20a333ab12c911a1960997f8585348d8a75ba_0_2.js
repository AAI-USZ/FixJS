function() {
				if ($(this).hasClass("disabled"))
					return;
				createAttribute(attribute, parentXPath, parentId);
				$(this).addClass("disabled");
			}