function () {
		for (var c = 0; c < _controllers.length; c++) {
			var controller = _controllers[c];

			controller.gamepadPressed = gamepadPressed;
			controller.gamepadReleased = gamepadReleased;
			controller.buttonsPressed = buttonsPressed;
			controller.buttonsReleased = buttonsReleased;
			controller.joystick = joystick;
		}
	}