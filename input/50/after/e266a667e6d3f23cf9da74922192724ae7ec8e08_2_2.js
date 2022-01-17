function createColumn(properties) {
			properties = properties || {};
			properties = Object.merge(properties, {
				"class": "board-column"
			});

			var column = new Element("div", properties);
			return column;
		}