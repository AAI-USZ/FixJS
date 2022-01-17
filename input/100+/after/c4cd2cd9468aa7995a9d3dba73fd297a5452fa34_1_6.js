function(props) {
		/** @type {!Object.<string,boolean>} */
		var inputs = {};

		for (var i = 0, bool, inputElemType, defaultView, len = props.length; i < len; i++) {
			inputElement.setAttribute('type', inputElemType = props[i]);
			bool = inputElement.type !== 'text';

			// We first check to see if the type we give it sticks..
			// If the type does, we feed it a textual value, which shouldn't be valid.
			// If the value doesn't stick, we know there's input sanitization which infers a custom UI
			if (bool) {
				inputElement.value = npf.userAgent.Support.SMILE;
				inputElement.style.cssText = 'position:absolute;visibility:hidden;';

				if (/^range$/.test(inputElemType) && inputElement.style.WebkitAppearance !== undefined) {
					document.documentElement.appendChild(inputElement);
					defaultView = document.defaultView;

					// Safari 2-4 allows the smiley as a value, despite making a slider
					bool =  defaultView.getComputedStyle &&
						defaultView.getComputedStyle(inputElement, null).WebkitAppearance !== 'textfield' &&
						// Mobile android web browser has false positive, so must
						// check the height to see if the widget is actually there.
						(inputElement.offsetHeight !== 0);
					document.documentElement.removeChild(inputElement);
				} else if (/^(search|tel)$/.test(inputElemType)) {
					// Spec doesnt define any special parsing or detectable UI
					//   behaviors so we pass these through as true

					// Interestingly, opera fails the earlier test, so it doesn't
					//  even make it here.
				} else if (/^(url|email)$/.test(inputElemType)) {
					// Real url and email support comes with prebaked validation.
					bool = inputElement.checkValidity && inputElement.checkValidity() === false;
				} else {
					// If the upgraded input compontent rejects the :) text, we got a winner
					bool = inputElement.value != npf.userAgent.Support.SMILE;
				}
			}

			inputs[props[i]] = !!bool;
		}

		return inputs;
	}