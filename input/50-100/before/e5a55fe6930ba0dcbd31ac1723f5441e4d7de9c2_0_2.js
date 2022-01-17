function() {

					// in the rare case idle time is lower then delay time
					clearTimeout(this.sccTimerDelay);

					Aloha.trigger('aloha-smart-content-changed',{
						'editable' : Aloha.activeEditable,
						'keyIdentifier' : null,
						'keyCode' : null,
						'char' : null,
						'triggerType' : 'idle',
						'snapshotContent' : me.getSnapshotContent()
					});

				}