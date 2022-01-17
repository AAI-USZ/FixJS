function (mappedControllers) {

		for (var controllerId in _controllers) {

			var unmapController = true;

			for (var c = 0; c < mappedControllers.length; c++) {

				var mappedControllerId = mappedControllers[c];

				if (mappedControllerId === controllerId) {
					unmapController = false;
					break;
				}
			}

			if (!unmapController) {
				continue;
			}

			var controller = _controllers[controllerId];

			controller.joystick = function (x, y, cId) { };
			controller.gamepadPressed = function (left, up, right, down, cId) { };
			controller.gamepadReleased = function (left, up, right, down, cId) { };
			controller.buttonsPressed = function (buttonA, buttonB, buttonC, buttonD, cId) { };
			controller.buttonsReleased = function (buttonA, buttonB, buttonC, buttonD, cId) { };
		}

	}