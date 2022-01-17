function processInput (code, e) {
		function completeSelectionRange (t, ss, se) {
			if (t.selectionStart.gt(ss) && t.selectionStart.gt(se)) {
				t.setSelectionRange(t.selectionStart);
			}
			else if (t.selectionEnd.lt(ss) && t.selectionEnd.lt(se)) {
				t.setSelectionRange(t.selectionEnd);
			}
			else if (t.selectionStart.ne(ss) && t.selectionEnd.eq(se)) {
				t.setSelectionRange(t.selectionStart);
			}
			else if (t.selectionStart.eq(ss) && t.selectionEnd.ne(se)) {
				t.setSelectionRange(t.selectionEnd);
			}
		}
		function doEditComplete () {
			isTextDirty = true;
			lastRegexFindCommand.text = null;
			if (config.vars.readonly && !isReadonlyWarned) {
				isReadonlyWarned = true;
				requestShowMessage(requestRegisterNotice(_('Warning: changing readonly element.')), true);
			}
		}
		function execCommandMap (t, key, subkey, code) {
			var map = commandMap;
			var ss = t.selectionStart;
			var se = t.selectionEnd;
			var result = execMap(t, e, map, key, subkey, code);

			if (result) {
				var canContinue = true;

				if (prefixInput.operation.length) {
					canContinue = execMap(
						t, e, map, prefixInput.operation, '@op', code, {s:ss, e:se}
					);
				}
				if (canContinue !== false) {
					isEditCompleted && doEditComplete();
					completeSelectionRange(t, ss, se);

					cursor.ensureVisible(isSmoothScrollRequested);
					cursor.update(scroller.running || state != 'normal' ?
						{visible:false} : {focused:true, visible:true});

					t.isLineOrientSelection =
					isEditCompleted =
					isVerticalMotion =
					isSmoothScrollRequested = false;

					if (isSimpleCommandUpdateRequested) {
						lastSimpleCommand = prefixInput.toString();
						isSimpleCommandUpdateRequested = false;
					}

					prefixInput.reset();
					requestShowPrefixInput();
				}
			}
		}
		function execEditMap (t, key, subkey, code) {
			if (editMap[key]) {
				var ss = t.selectionStart;
				var se = t.selectionEnd;
				execMap(t, e, editMap, key, subkey, code);
				completeSelectionRange(t, ss, se);
				cursor.ensureVisible();
				cursor.update({focused:true, visible:true});

				return true;
			}
			return false;
		}
		function execLineInputEditMap (t, key, subkey, code) {
			if (lineInputEditMap[key]) {
				execMap(t, e, lineInputEditMap, key, subkey, code);
				return true;
			}
			return false;
		}
		function processAbbrevs (t, force) {
			var regex = config.vars.iskeyword;
			var target, last;

			if (force) {
				if (editedStringCurrent.length < 1) return;
				target = editedStringCurrent;
				last = '';
			}
			else {
				if (editedStringCurrent.length < 2) return;
				target = editedStringCurrent.substring(0, editedStringCurrent.length - 1);
				last = editedStringCurrent.substr(-1);
				if (!(regex.test(target.substr(-1)) && !regex.test(last))) return;
			}

			for (var i in abbrevs) {
				if (target.substr(-i.length) != i) continue;

				var canTransit = false;
				if (regex.test(i.charAt(0))) {
					if (i.length == 1) {
						if (t.selectionStartCol - i.length <= 1
						||  target.length - i.length <= 0
						||  /\s/.test(target.substr(-(i.length + 1), 1))) {
							canTransit = true;
						}
					}
					else {
						if (t.selectionStartCol - i.length <= 1
						||  target.length - i.length <= 0
						||  !regex.test(target.substr(-(i.length + 1), 1))) {
							canTransit = true;
						}
					}
				}
				else {
					if (t.selectionStartCol - i.length <= 1
					||  target.length - i.length <= 0
					||  regex.test(target.substr(-(i.length + 1), 1))
					||  /\s/.test(target.substr(-(i.length + 1), 1))) {
						canTransit = true;
					}
				}
				if (!canTransit) continue;

				editedStringCurrent = target + multiply('\u0008', i.length) + abbrevs[i] + last;
				deleteChars(t, i.length + last.length);
				(inputMode == 'edit' ? insert : overwrite)(t, abbrevs[i] + last);
				break;
			}
		}

		var editor = getEditorCore();
		var input = $(LINE_INPUT_ID);
		var letter = chr(code);
		var mapkey = chr(code, true);
		var subkey = inputMode;
		var result = false;

		switch (inputModeSub) {
		case 'wait-a-letter':
			mapkey = chr(lastKeyCode, true);
			subkey = inputModeSub;
			inputModeSub = '';
			break;

		case 'wait-register':
			if (registers.isReadable(letter)) {
				mapkey = chr(lastKeyCode, true);
				subkey = inputModeSub;
				inputModeSub = '';
			}
			else {
				inputModeSub = '';
				lastKeyCode = code;
				return true;
			}
			break;

		case 'backlog':
			if (backlog.queued) {
				if (letter == 'q') {
					backlog.clear();
					backlog.hide();
					popInputMode();
					inputModeSub = '';
					return true;
				}
				else if (letter == ':') {
					popInputMode();
					subkey = inputMode;
					inputModeSub = '';
					break;
				}
				else {
					backlog.write(letter == '\u000d');
					return true;
				}
			}
			else {
				letter != ':' && backlog.hide();
				popInputMode();
				subkey = inputMode;
				inputModeSub = '';
				if (letter == '\u000d' || letter == ' ' || state != 'normal') {
					return true;
				}
			}
			break;

		case 'ex-s':
			if (!substituteWorker.kontinue(editor, letter)) {
				substituteWorker = null;
				inputModeSub = '';
				cursor.ensureVisible();
				cursor.update({visible:true});
			}
			return true;

		default:
			inputModeSub = '';
		}

		switch (inputMode) {
		case 'command':
			execCommandMap(editor, mapkey, subkey, code);
			result = true;
			break;

		case 'edit':
		case 'edit-overwrite':
			cursor.update({visible:false});

			if (subkey == inputMode && code == 0x1b) {
				processAbbrevs(editor, true);

				var editedStringSaved = editedString;

				if (editRepeatCount > 1) {
					var editedStringFollowed = editedStringSuffix + editedStringSaved;
					for (var i = 1; i < editRepeatCount; i++) {
						executeViCommand(editedStringFollowed);
					}
				}

				logEditing(editor, true);

				var n = editor.selectionStart;
				n.col = Math.max(n.col - 1, 0);
				editor.setSelectionRange(n);

				popInputMode();
				prefixInput.isLocked = false;
				prefixInput.trailer = editedStringSaved;
				registers.set('.', editedStringSaved);

				cursor.ensureVisible();
				cursor.update({type:inputMode, visible:true});

				if (runLevel == 0 && isSimpleCommandUpdateRequested) {
					lastSimpleCommand = prefixInput.toString() + letter;
					isSimpleCommandUpdateRequested = false;
				}

				(isEditCompleted || editedStringSaved != '') && doEditComplete();
				editedString = editedStringCurrent = '';
				overwroteString = false;
				prefixInput.reset();
				isEditCompleted = isVerticalMotion = false;
				isSmoothScrollRequested = false;
				showMessage('');
				requestShowPrefixInput();
				editLogger.close();// edit-wrapper
			}
			else {
				editedString += letter;
				editedStringCurrent += letter;

				if (config.vars.showmatch) {
					pairBracketsIndicator && pairBracketsIndicator.clear();
					pairBracketsIndicator = PairBracketsIndicator.getObject(letter, editor);
				}
				if (execEditMap(editor, mapkey, subkey, code)) {
					//
				}
				else if (isEditing() && (code == 0x08 || code == 0x0a || code >= 32)) {
					if (!editStartPosition) {
						editStartPosition = editor.selectionStart;
					}

					(inputMode == 'edit' ? insert : overwrite)(editor, letter);
					processAbbrevs(editor);

					if (runLevel == 0) {
						cursor.ensureVisible();
						cursor.update({visible:true});
					}
				}
			}
			result = true;
			break;

		case 'line-input':
			var canEscape = code == 0x1b
				|| code == 0x08 && input.selectionStart == 0 && input.selectionEnd == 0;

			dataset(input, 'current', input.value);

			if (subkey == inputMode && canEscape) {
				mapkey = prefixInput.motion || prefixInput.operation;
				backlog.hide();
				execMap(
					editor, e, commandMap,
					mapkey, '@' + inputMode + '-escape', input.value);
				popInputMode();
				prefixInput.reset();
				requestShowPrefixInput();
			}
			else if (subkey == inputMode && (code == 0x0d || code == 0x0a)) {
				var line = toNativeControl(input.value);
				prefixInput.trailer = line + chr(code);
				mapkey = prefixInput.motion || prefixInput.operation;
				execMap(
					editor, e, commandMap,
					mapkey, '@' + inputMode + '-reset', line);
				execCommandMap(editor, mapkey, subkey, line);

				popInputMode();
				prefixInput.reset();
			}
			else if (execLineInputEditMap(input, mapkey, subkey, code)) {
				setTimeout(function () {
					var input = $(LINE_INPUT_ID);
					if (input.value != dataset(input, 'current')) {
						var e = document.createEvent('Event');
						e.initEvent('input', false, false);
						input.dispatchEvent(e);
					}
				}, 1);
			}
			else {
				if (code >= 0 && code < 32) {
					letter = toVisibleControl(code);
					code = letter.charCodeAt(0);
				}
				if (code >= 32) {
					lineInputHistories.isInitial = true;
					input.value =
						input.value.substring(0, input.selectionStart) +
						letter +
						input.value.substring(input.selectionEnd);
					input.selectionStart += letter.length;
					input.selectionEnd = input.selectionStart;
					processInputSupplement(e);
				}
			}
			result = true;
			break;

		default:
			result = true;
		}

		if (terminated) {
			uninstall(editor, writeOnTermination);
		}
		else {
			if (requestedState.inputMode) {
				pushInputMode(
					requestedState.inputMode.mode,
					requestedState.inputMode.modeSub,
					requestedState.inputMode.initial);
				requestedState.inputMode = null;
			}
			var messageUpdated = false;
			if (requestedState.modeline) {
				switch (requestedState.modeline.type) {
				case 'prefix':
					showPrefixInput(editor, requestedState.modeline.message);
					break;
				case 'message':
					messageUpdated = true;
					showMessage(
						requestedState.modeline.message,
						requestedState.modeline.emphasis,
						requestedState.modeline.pseudoCursor,
						requestedState.modeline.volatile_
					);
					break;
				}
				requestedState.modeline = null;
				config.vars.errorbells && requestRegisterNotice();
			}
			if (requestedState.notice) {
				if (requestedState.notice.play) {
					bell.play();
				}
				if (requestedState.notice.message) {
					lastMessage = toNativeControl(requestedState.notice.message);
					console.log(requestedState.notice.message);
				}
				requestedState.notice = null;
			}
			if (runLevel == 0 && state == 'normal' && (backlog.queued || backlog.visible)) {
				backlog.write(false, messageUpdated);
			}
		}

		lastKeyCode = code;
		return result;
	}