function () {
				
					if ( settings.get('debug') ) {
					
						window.vibe = self
					}
				
					// stop the throbber.
					if ( modal.hasDialogue(throbberID) ) {
						modal.close(throbberID)
					}
				}