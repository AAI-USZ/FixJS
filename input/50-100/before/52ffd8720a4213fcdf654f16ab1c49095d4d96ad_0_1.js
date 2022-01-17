function () {

			if (!settings.enabled) {
				return;
			}

			$selectionRect.hide().appendTo('body');

			$document
				.on('mousedown', '.noSelection', noSelection)
				.on('mousedown', '.noSelectionUnlessCtrl,input,a', noSelectionUnlessCtrl)
				.on('mousedown', selectionStart);
		}