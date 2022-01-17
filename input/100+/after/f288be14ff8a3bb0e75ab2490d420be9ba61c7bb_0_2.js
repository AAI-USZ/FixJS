function() {
		var thisObj = this;

		if("__char" in thisObj)return thisObj["__char"];

		if(!(thisObj instanceof _KeyboardEvent) && !(thisObj.type in KEYBOARD_EVENTS))return;

		var _keyCode = thisObj.which || thisObj.keyCode
		  , notKeyPress = thisObj.type != "keypress"
		  , value = notKeyPress && VK_COMMON[_keyCode]
		  , hasShifed_and_Unshifed_value = typeof value == "object" && (typeof value._char != "undefined" || typeof value._charShifted != "undefined")
		  , needLowerCase = (notKeyPress || hasShifed_and_Unshifed_value) && !thisObj.shiftKey
		;

		if(value && (typeof value !== "object" || value._char === false)) {
			value = "";
		}
		else if(hasShifed_and_Unshifed_value) {
			value = (needLowerCase ? value._char : value._charShifted || value._char) || "";
		}
		else {
			if("keyIdentifier" in thisObj && _helper_isRight_keyIdentifier(thisObj["keyIdentifier"])) {
				value = "";
			}
			else {
				value = String.fromCharCode(_keyCode);
				if(needLowerCase)value = value.toLowerCase();
			}
		}

		return this["__char"] = value;
	}