function () {
			var that = this;
			Aloha.Editable.setContentSerializer( function(editableElement) {
				if ( !that.settings.editables && !that.settings.config ) {
					return domToXhtml.contentsToXhtml(editableElement);
				}

				if ( that.settings.editables &&
					that.settings.editables['#'+$(editableElement).attr("id")] == 'dom-to-xhtml' ) {
					return domToXhtml.contentsToXhtml(editableElement);
				} else if ( that.settings.config &&
					that.settings.config == 'dom-to-xhtml' &&
					!that.settings.editables['#'+$(editableElement).attr("id")] ) {
					return domToXhtml.contentsToXhtml(editableElement);
				} else {
					return $(editableElement).html();
				}
			});
		}