function(/*String?*/ attrName, /*Array?*/ values) {

		// summary:

		//		Export the shapes with the same tag. If the tag is not specified, export all the shapes

		var shapes = this.surface.getShapesByAttribute(attrName, values), 

		tmpStr,

		jsonString = [], 

		type;

		

		dojo.forEach(shapes, function(shape) {

			if (shape.isInstanceOf(davinci.review.drawing.shapes.Arrow)) {

				type = "Arrow";

			} else if(shape.isInstanceOf(davinci.review.drawing.shapes.Rectangle)) {

				type = "Rectangle";

			} else if(shape.isInstanceOf(davinci.review.drawing.shapes.Ellipse)) {

				type = "Ellipse";

			} else if(shape.isInstanceOf(davinci.review.drawing.shapes.Text)) {

				type = "Text";

			} else {

				return;

			}



			tmpStr = "{type:\"" + type + "\",x1:" + shape.x1 + ",y1:" + shape.y1 + ",x2:" + shape.x2 + ",y2:" + shape.y2;

			for (var attr in shape.attributeMap) {

				if (shape.attributeMap.hasOwnProperty(attr)) {

					tmpStr += "," + attr + ":\"" + shape[attr] + "\"";

				}

			}

			if (type == "Text") {

				tmpStr += ",text:\"" + escape(shape.getText()) + "\"}";

			} else {

				tmpStr += "}";

			}

			jsonString.push(tmpStr);

		}
		return "[" + jsonString.join(",") + "]";

	},
