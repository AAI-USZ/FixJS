function(event, rangeObject, originalEvent) {

				if (originalEvent && originalEvent.target) {
					// Check if the element is currently beeing resized
					if (that.settings.ui.resizable && !jQuery(originalEvent.target).hasClass('ui-resizable-handle')) {
						that.endResize();
					}
				}
				

				if(Aloha.activeEditable !== null) {
					var foundMarkup = that.findImgMarkup( rangeObject );
					//var config = that.getEditableConfig(Aloha.activeEditable.obj);

//					if (typeof config.img !== 'undefined' ) {
//						that.insertImgButton.show();
//						FloatingMenu.doLayout();
//					} else {
//						that.insertImgButton.hide();
//						// TODO this should not be necessary here!
//						FloatingMenu.doLayout();
//						// leave if img is not allowed
//						return;
//					}

					// Enable image specific ui components if the element is an image
					if ( foundMarkup ) {
						that.insertImgButton.hide();
						FloatingMenu.setScope(that.name);
						if(that.settings.ui.meta) {
							that.imgSrcField.setTargetObject(foundMarkup, 'src');
							that.imgTitleField.setTargetObject(foundMarkup, 'title');
						}
						that.imgSrcField.focus();
						FloatingMenu.userActivatedTab = i18n.t('floatingmenu.tab.img');
					} else {
						if(that.settings.ui.meta) {
							that.imgSrcField.setTargetObject(null);
						}
					}
					// TODO this should not be necessary here!
					FloatingMenu.doLayout();
				}

			}