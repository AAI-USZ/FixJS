function () {

			stateOptions = [normalState, hoverState, pressedState][curState];

			stateStyle = [normalStyle, hoverStyle, pressedStyle][curState];

			label.attr(stateOptions)

				.css(stateStyle);

		}