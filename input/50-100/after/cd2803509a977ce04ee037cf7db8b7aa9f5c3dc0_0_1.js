function (state) {

			curState = state;

			if (!state) {

				label.attr(normalState)

					.css(normalStyle);

			} else if (state === 2) {

				label.attr(pressedState)

					.css(pressedStyle);

			}

		}