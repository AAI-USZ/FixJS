function createColumn(properties) {
			properties = properties || {};
			properties = Object.merge(properties, {
				"class": "board-column",
				// styles: {
				// 	"background-color": "orange",
				// 	display: "inline-block",
				// 	"min-height": 500,
				// 	width: columnWidth
				// }
			});

			var column = new Element("div", properties);
			return column;
		}