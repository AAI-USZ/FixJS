function _keyDownHandler(e) {
	//debugger
	var _keyCode = e.which || e.keyCode
	  , thisObj = this._this
	  , listener
	  , _
	  , special = e.ctrlKey || e.altKey
	;

	if(special || _keyCode in VK_COMMON && VK_COMMON[_keyCode]._key !== 0 || e["__key"]) {
		listener = this._listener;

		if(typeof listener !== "function") {
			if("handleEvent" in listener) {
				thisObj = listener;
				listener = listener.handleEvent;
			}
		}

		listener.apply(thisObj, arguments);
	}
	else {
		_ = thisObj["_"] || (thisObj["_"] = {});
		_[_shim_event_keyCodeUUID] = _keyCode;
	}
}