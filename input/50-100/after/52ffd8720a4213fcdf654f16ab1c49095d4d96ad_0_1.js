function () {

			if (!settings.enabled) {
				return;
			}

			$selectionRect.hide().appendTo('body');

			$(window).on('focus', onFocus);

			$document
				.on('keydown', onKeydown)
				.on('keyup', onKeyup)
				.on('mousedown', '.noSelection', noSelection)
				.on('mousedown', '.noSelectionUnlessCtrl,input,a', noSelectionUnlessCtrl)
				.on('mousedown', selectionStart);
		}