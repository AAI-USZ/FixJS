function $makeDropbox () {
			$.log('Creating dropbox.');

			var widgets = INNERCONTEXT.WIDGETS
			  , ui      = INNERCONTEXT.UI
			  ;
			
			if (void 0 === widgets.$coverTypeSelect) {
				widgets.$dropBox = ui.assemble(INNERCONTEXT.TEMPLATES.dropbox)[0];
			}
			return widgets.$dropBox.quickClone(true);
		}