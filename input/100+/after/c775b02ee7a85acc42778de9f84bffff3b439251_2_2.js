function (gamepadPressed, gamepadReleased, buttonsPressed, buttonsReleased, joystick, controllerId) {

		var controller = _controllers[controllerId];

		controller.joystick = joystick || function (x, y, cId) { };
		controller.gamepadPressed = gamepadPressed || function (left, up, right, down, cId) { };
		controller.gamepadReleased = gamepadReleased || function (left, up, right, down, cId) { };
		controller.buttonsPressed = buttonsPressed || function (buttonA, buttonB, buttonC, buttonD, cId) { };
		controller.buttonsReleased = buttonsReleased || function (buttonA, buttonB, buttonC, buttonD, cId) { };

	}