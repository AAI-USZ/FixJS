function(event) {
			var me = this,
				uniChar = null,
				re, match;

			// ignore meta keys like crtl+v or crtl+l and so on
			if (event && (event.metaKey || event.crtlKey || event.altKey)) {
				return false;
			}

			if (event && event.originalEvent) {

				// regex to strip unicode
				re = new RegExp("U\\+(\\w{4})");
				match = re.exec(event.originalEvent.keyIdentifier);

				// Use keyIdentifier if available
				if ( event.originalEvent.keyIdentifier && 1 == 2) {
					if (match !== null) {
						uniChar = unescape('%u' + match[1]);
					}
					if (uniChar === null) {
						uniChar = event.originalEvent.keyIdentifier;
					}
				// FF & Opera don't support keyIdentifier
				} else {
					// Use among browsers reliable which http://api.jquery.com/keypress
					uniChar = (this.keyCodeMap[this.keyCode] || String.fromCharCode(event.which) || 'unknown');
				}
			}
			// handle "Enter" -- it's not "U+1234" -- when returned via "event.originalEvent.keyIdentifier"
			// reference: http://www.w3.org/TR/2007/WD-DOM-Level-3-Events-20071221/keyset.html
			if (jQuery.inArray(uniChar, this.sccDelimiters) >= 0) {

				clearTimeout(this.sccTimerIdle);
				clearTimeout(this.sccTimerDelay);

				this.sccTimerDelay = setTimeout(function() {

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
				},this.sccDelay);
			}

			else if (uniChar !== null) {

				this.sccTimerIdle = setTimeout(function() {

					// in the rare case idle time is lower then delay time
					clearTimeout(this.sccTimerDelay);

					Aloha.trigger('aloha-smart-content-changed',{
						'editable' : me,
						'keyIdentifier' : null,
						'keyCode' : null,
						'char' : null,
						'triggerType' : 'idle',
						'snapshotContent' : me.getSnapshotContent()
					});

				},this.sccIdle);

			}

			else if (event && event.type === 'paste') {
				Aloha.trigger('aloha-smart-content-changed',{
					'editable' : me,
					'keyIdentifier' : null,
					'keyCode' : null,
					'char' : null,
					'triggerType' : 'paste', // paste
					'snapshotContent' : me.getSnapshotContent()
				});

			}

			else if (event && event.type === 'blur') {
				Aloha.trigger('aloha-smart-content-changed',{
					'editable' : me,
					'keyIdentifier' : null,
					'keyCode' : null,
					'char' : null,
					'triggerType' : 'blur',
					'snapshotContent' : me.getSnapshotContent()
				});

			}

		}