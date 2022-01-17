function(el) {

		var styles = {'borderStyle':true, 'borderWidth':true, 'borderColor':true};

		for (var s in styles) {

			el.vml.color.shape.style[s] = el.currentStyle[s];

		}

	}