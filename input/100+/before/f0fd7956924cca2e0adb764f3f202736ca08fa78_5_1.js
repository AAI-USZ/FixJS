function(event, rangeObject, originalEvent) {
					var config, foundMarkup;

					if (originalEvent && originalEvent.target) {
						// Check if the element is currently beeing resized
						if (that.settings.ui.resizable &&
							!jQuery(originalEvent.target).hasClass('ui-resizable-handle')) {
							that.endResize();
						}
					}

					if (Aloha.activeEditable !== null) {
						foundMarkup = that.findImgMarkup( rangeObject );
						config = that.getEditableConfig(Aloha.activeEditable.obj);
						that.settings = this.settings = jQuery.extend(true, that.defaultSettings, config);

						if ( jQuery.isEmpty(config) ) {
							that.insertImgButton.hide();
							return;
						} else {
							that.insertImgButton.show();
						}

						// Enable image specific ui components if the element is an image
						if (foundMarkup) {
							that.insertImgButton.hide();
							FloatingMenu.setScope(that.name);
							if ( that.settings.ui.meta ) {
								that.imgSrcField.setTargetObject(foundMarkup, 'src');
								that.imgTitleField.setTargetObject(foundMarkup, 'title');
							}
							that.imgSrcField.focus();
							FloatingMenu.activateTabOfButton('imgsrc');
						} else {
							if ( that.settings.ui.meta) {
								that.imgSrcField.setTargetObject(null);
							}
						}
						// TODO this should not be necessary here!
						FloatingMenu.doLayout();
					}

				}