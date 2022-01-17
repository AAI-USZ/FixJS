function $makeAddDropboxButton () {
			$.log('Creating add dropbox button.', 1);

			var widgets = INNERCONTEXT.WIDGETS;

			if (void 0 === widgets.$addDropboxButton) {
				widgets.$addDropboxButton = $.make('input', { 'class' : 'caaAdd'
				                                            , title   : $.l('Add image one release')
				                                            , type    : 'button'
				                                            , value   : '+'
				                                            });
			}
			return widgets.$addDropboxButton.quickClone(false);
		}