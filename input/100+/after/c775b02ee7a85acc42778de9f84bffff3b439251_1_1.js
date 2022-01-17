function handleJILKUOKeys(e, keyDown) {
		var controllerId = "keyboard_JILKUO";
		
		e.preventDefault();

		if (e.keyCode == KeyEvent.DOM_VK_J) {
			if (keyDown && !_joy2Left) {
				_joy2Left = true;
				_interpretor.gamepadPressed(true, false, false, false, controllerId);
			}
			else if (!keyDown && _joy2Left) {
				_joy2Left = false;
				_interpretor.gamepadReleased(true, false, false, false, controllerId);
			}
		}
		else if (e.keyCode == KeyEvent.DOM_VK_I) {
			if (keyDown && !_joy2Up) {
				_joy2Up = true;
				_interpretor.gamepadPressed(false, true, false, false, controllerId);
			}
			else if (!keyDown && _joy2Up) {
				_joy2Up = false;
				_interpretor.gamepadReleased(false, true, false, false, controllerId);
			}
		}
		else if (e.keyCode == KeyEvent.DOM_VK_L) {
			if (keyDown && !_joy2Right) {
				_joy2Right = true;
				_interpretor.gamepadPressed(false, false, true, false, controllerId);
			}
			else if (!keyDown && _joy2Right) {
				_joy2Right = false;
				_interpretor.gamepadReleased(false, false, true, false, controllerId);
			}
		}
		else if (e.keyCode == KeyEvent.DOM_VK_K) {
			if (keyDown && !_joy2Down) {
				_joy2Down = true;
				_interpretor.gamepadPressed(false, false, false, true, controllerId);
			}
			else if (!keyDown && _joy2Down) {
				_joy2Down = false;
				_interpretor.gamepadReleased(false, false, false, true, controllerId);
			}
		}
		else if (e.keyCode == KeyEvent.DOM_VK_U) {
			if (keyDown && !_joy2ButtonADown) {
				_joy2ButtonADown = true;
				_interpretor.buttonsPressed(true, false, false, false, controllerId);
			}
			else if (!keyDown && _joy2ButtonADown) {
				_joy2ButtonADown = false;
				_interpretor.buttonsReleased(true, false, false, false, controllerId);
			}
		}
		else if (e.keyCode == KeyEvent.DOM_VK_O) {
			if (keyDown && !_joy2ButtonBDown) {
				_joy2ButtonBDown = true;
				_interpretor.buttonsPressed(false, true, false, false, controllerId);
			}
			else if (!keyDown && _joy2ButtonBDown) {
				_joy2ButtonBDown = false;
				_interpretor.buttonsReleased(false, true, false, false, controllerId);
			}
		}

		var x;
		if (_joy2Left && !_joy2Right)
			x = -1;
		else if (_joy2Right && !_joy2Left)
			x = 1;
		else
			x = 0;

		var y;
		if (_joy2Up && !_joy2Down)
			y = -1;
		else if (_joy2Down && !_joy2Up)
			y = 1;
		else
			y = 0;
				

		_interpretor.joystick(x, y, controllerId);	
	
	}