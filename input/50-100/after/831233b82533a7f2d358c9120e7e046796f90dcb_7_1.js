function( event, editable) {

					try {
						// this will disable mozillas image resizing facilities
						document.execCommand( 'enableObjectResizing', false, false);
					} catch (e) {
						Aloha.Log.info( e, 'Could not disable enableObjectResizing');
						// this is just for others, who will not support disabling enableObjectResizing
					}

					// Inital click on images will be handled here
					// editable.obj.find('img').attr('_moz_resizing', false);
					// editable.obj.find('img').contentEditable(false);
					// @todo there's an issue when pressing the mouse button / shift key and release it... resizing does not stop on certain conditions. see: https://getsatisfaction.com/aloha_editor/topics/image_resizing-yfzk8
					editable.obj.delegate( 'img', 'mouseup', function (event) {
						that.clickImage(event);
						event.stopPropagation();
					});
				}