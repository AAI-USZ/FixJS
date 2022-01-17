function (controllers, $, undefined) {

	var _controllers = [];

	controllers.stub = function () {


	};

	controllers.start = function () {

	};

	controllers.registerInput = function (controllerId) {

		var controller = {
			id: controllerId,
			joystick: function (x, y) { },
			gamepadPressed: function (left, up, right, down, cId) { },
			gamepadReleased: function (left, up, right, down, cId) { },
			buttonsPressed: function (buttonA, buttonB, buttonC, buttonD, cId) { },
			buttonsReleased: function (buttonA, buttonB, buttonC, buttonD, cId) { }
		};

		_controllers[controllerId] = controller;

	};

	controllers.joystick = function (x, y, controllerId) {
		var controller = _controllers[controllerId];

		if (controller && controller.joystick) {
			controller.joystick(x, y, controllerId);
		}
	};

	controllers.gamepadPressed = function (left, up, right, down, controllerId) {

		var controller = _controllers[controllerId];

		if (controller && controller.gamepadPressed) {
			controller.gamepadPressed(left, up, right, down, controllerId);
		}

	};

	controllers.gamepadReleased = function (left, up, right, down, controllerId) {

		var controller = _controllers[controllerId];

		if (controller && controller.gamepadReleased) {
			controller.gamepadReleased(left, up, right, down, controllerId);
		}

	};

	controllers.buttonsPressed = function (buttonA, buttonB, buttonC, buttonD, controllerId) {

		var controller = _controllers[controllerId];

		if (controller && controller.buttonsPressed) {
			controller.buttonsPressed(buttonA, buttonB, buttonC, buttonD, controllerId);
		}

	};

	controllers.buttonsReleased = function (buttonA, buttonB, buttonC, buttonD, controllerId) {

		var controller = _controllers[controllerId];

		if (controller && controller.buttonsReleased) {
			controller.buttonsReleased(buttonA, buttonB, buttonC, buttonD, controllerId);
		}

	};

	controllers.unmapControllersExcept = function (mappedControllers) {

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

	};

	controllers.mapController = function (gamepadPressed, gamepadReleased, buttonsPressed, buttonsReleased, joystick, controllerId) {

		var controller = _controllers[controllerId];

		controller.joystick = joystick || function (x, y, cId) { };
		controller.gamepadPressed = gamepadPressed || function (left, up, right, down, cId) { };
		controller.gamepadReleased = gamepadReleased || function (left, up, right, down, cId) { };
		controller.buttonsPressed = buttonsPressed || function (buttonA, buttonB, buttonC, buttonD, cId) { };
		controller.buttonsReleased = buttonsReleased || function (buttonA, buttonB, buttonC, buttonD, cId) { };

	};

	controllers.mapControllers = function (gamepadPressed, gamepadReleased, buttonsPressed, buttonsReleased, joystick) {
		for (var controllerId in _controllers) {

			var controller = _controllers[controllerId];

			controller.joystick = joystick || function (x, y, cId) { };
			controller.gamepadPressed = gamepadPressed || function (left, up, right, down, cId) { };
			controller.gamepadReleased = gamepadReleased || function (left, up, right, down, cId) { };
			controller.buttonsPressed = buttonsPressed || function (buttonA, buttonB, buttonC, buttonD, cId) { };
			controller.buttonsReleased = buttonsReleased || function (buttonA, buttonB, buttonC, buttonD, cId) { };

		}
	};

} (window.partyMachineControllers = window.partyMachineControllers || {}