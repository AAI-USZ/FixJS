function handleKeydown (e) {
		//console.log([e.keyCode, e.charCode, e.which].join(', '));
		function stop (e) {
			e.preventDefault();
			e.stopPropagation();
			e.returnValue = false;
		}

		if (scroller.running) {
			return stop(e);
		}
		if (cursor.inComposition || exCommandExecutor.isRunning) {
			return;
		}

		var keyCode;
		function fixCtrl (code) {
			if (code != undefined) {
				keyCode = code;
			}
			if (e.ctrlKey && keyCode >= 64 && keyCode <= 95) {
				keyCode -= 64;
				return true;
			}
			else if (e.ctrlKey && keyCode >= 96 && keyCode <= 127) {
				keyCode -= 96;
				return true;
			}
			return false;
		}
		if (window.chrome && 'keyIdentifier' in e) {
			if (e.type == 'keydown') {
				if (e.keyCode >= 16 && e.keyCode <= 18) {
					return stop(e);
				}
				if (e.keyIdentifier != '' && WEBKIT_KEY_IDENTIFIERS_REVERSED[e.keyIdentifier]) {
					keyCode = -WEBKIT_KEY_IDENTIFIERS_REVERSED[e.keyIdentifier];
				}
				else if (e.ctrlKey && WEBKIT_CTRL_SPECIAL_KEYS_REVERSED[e.keyIdentifier]) {
					keyCode = WEBKIT_CTRL_SPECIAL_KEYS_REVERSED[e.keyIdentifier];
				}
				else if (!fixCtrl(e.keyCode)) {
					return;
				}
			}
			else {
				fixCtrl(e.charCode);
			}
		}
		else {
			if (SPECIAL_KEYS[e.keyCode] && e.which != e.keyCode) {
				keyCode = e.keyCode == 46 ? 127 : -e.keyCode;
			}
			else if (e.keyCode >= 127 && e.which === 0) {
				return stop(e);
			}
			else {
				fixCtrl(e.charCode || e.keyCode);
			}
		}

		isInteractive = true;
		incrementStrokeCount();
		(extensionChannel && prefixInput.toString() == '"*' ? extensionChannel.getClipboard : $call)
			.call(extensionChannel, function () {
				mapManager.process(keyCode, function (keyCode) {
					processInput(keyCode, e) && stop(e);
				});
			});
	}