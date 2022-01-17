function(color, opac, type) {
			// update the editor's fill paint
			var opts = null;
			if (color.indexOf("url(#") === 0) {
				var refElem = svgCanvas.getRefElem(color);
				if(refElem) {
					refElem = refElem.cloneNode(true);
				} else {
					refElem =  $("#" + type + "_color defs *")[0];
				}

				opts = { alpha: opac };
				opts[refElem.tagName] = refElem;
			} 
			else if (color.indexOf("#") === 0) {
				opts = {
					alpha: opac,
					solidColor: color.substr(1)
				};
			}
			else {
				opts = {
					alpha: opac,
					solidColor: 'none'
				};
			}
			return new $.jGraduate.Paint(opts);
		}