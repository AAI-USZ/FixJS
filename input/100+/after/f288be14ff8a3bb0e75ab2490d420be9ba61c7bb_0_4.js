function _keyDown_via_keyPress_Handler(e) {
	//debugger
	var _keyCode
	  , thisObj = this
	  , _ = thisObj["_"]
	  , _event
	;

	if(_ && _shim_event_keyCodeUUID in _) {
		_keyCode = _[_shim_event_keyCodeUUID];
		delete _[_shim_event_keyCodeUUID];
		if(_NEED_KEYCODE_BUGFIX && _keyCode in VK_COMMON && VK_COMMON[_keyCode]._keyCode) {
			_keyCode = VK_COMMON[_keyCode]._keyCode;
		}

		_event = new _KeyboardEvent("keydown", e);
		delete _event["which"];
		delete _event["keyCode"];
		delete _event["__location"];
		delete _event["keyLocation"];
		_Object_defineProperty(_event, "which", {"value" : _keyCode});
		_Object_defineProperty(_event, "keyCode", {"value" : _keyCode});
		_event["location"] = _getter_KeyboardEvent_location.call(_event);//forse getter's

		if(!thisObj.dispatchEvent(_event)) {
			e.preventDefault();
		}
	}
}