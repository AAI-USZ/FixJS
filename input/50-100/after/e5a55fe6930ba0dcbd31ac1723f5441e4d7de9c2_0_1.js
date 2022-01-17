function() {

					Aloha.trigger('aloha-smart-content-changed',{
						'editable' : me,
						'keyIdentifier' : event.originalEvent.keyIdentifier,
						'keyCode' : event.keyCode,
						'char' : uniChar,
						'triggerType' : 'keypress', // keypress, timer, blur, paste
						'snapshotContent' : me.getSnapshotContent()
					});

					Aloha.Log.debug(this, 'smartContentChanged: event type keypress triggered');
	/*
					var r = Aloha.Selection.rangeObject;
					if (r.isCollapsed()
						&& r.startContainer.nodeType == 3) {

						var posDummy = jQuery('<span id="GENTICS-Aloha-PosDummy" />');

						GENTICS.Utils.Dom.insertIntoDOM(
							posDummy,
							r,
							this.obj,
							null,
							false,
							false
						);

						console.log(posDummy.offset().top, posDummy.offset().left);

						GENTICS.Utils.Dom.removeFromDOM(
							posDummy,
							r,
							false
						);

						r.select();

					}
	*/
				}