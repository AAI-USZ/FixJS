function $makeDropbox () {
			$.log('Creating dropbox.');

			var widgets = INNERCONTEXT.WIDGETS;
			
			if (void 0 === widgets.$dropBox) {
				widgets.$dropBox = INNERCONTEXT.UTILITY.assemble(INNERCONTEXT.TEMPLATES.dropbox)[0];
			}
			return widgets.$dropBox.quickClone(true);
		}