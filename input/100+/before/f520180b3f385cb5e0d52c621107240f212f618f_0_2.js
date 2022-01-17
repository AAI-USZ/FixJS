function() {
			var formats = [ 'strong', 'em', 'b', 'i', 's', 'cite', 'q', 'code', 'abbr', 'del', 'sub', 'sup'],
				rangeObject = Aloha.Selection.rangeObject,
				i;
			
			// formats to be removed by the removeFormat button may now be configured using Aloha.settings.plugins.format.removeFormats = ['b', 'strong', ...]
			if (this.settings.removeFormats) {
				formats = this.settings.removeFormats;
			}

			if (rangeObject.isCollapsed()) {
				return;
			}

			for (i = 0; i < formats.length; i++) {
				GENTICS.Utils.Dom.removeMarkup(rangeObject, jQuery('<' + formats[i] + '></' + formats[i] + '>'), Aloha.activeEditable.obj);
			}

			// select the modified range
			rangeObject.select();
			// TODO: trigger event - removed Format

		}