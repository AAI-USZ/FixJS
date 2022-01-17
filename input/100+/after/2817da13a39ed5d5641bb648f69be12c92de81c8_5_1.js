function(shape) {

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

			var o = {type:type ,x1:shape.x1, y1:shape.y1, x2:shape.x2, y2:shape.y2};

			for (var attr in shape.attributeMap) {

				if (shape.attributeMap.hasOwnProperty(attr)) {

					var s = (attr == 'stateList' || attr == 'sceneList') ?

							dojo.toJson(shape[attr]) : shape[attr];

					o[attr] = s;

				}

			}

			if (type == "Text") {

				o.text = escape(shape.getText());

			}

			tmpStr = dojo.toJson(o);

			jsonString.push(tmpStr);

		}