function _KeyboardEvent(type, dict) {// KeyboardEvent  constructor
	var e;
	try {
		e = document.createEvent("KeyboardEvent");
	}
	catch(err) {
		e = document.createEvent("Event");
	}

	dict = dict || {};

	var localDict = {}
	  , _prop_name
	;

	for(_prop_name in _valid_initKeyboardEvent_dictionary_properties)if(_hasOwnProperty(_valid_initKeyboardEvent_dictionary_properties, _prop_name)) {
		localDict[_prop_name] = _prop_name in dict && dict[_prop_name] !== void 0 ?
			dict[_prop_name]
			:
			_valid_initKeyboardEvent_dictionary_properties[_prop_name]
		;
	}

	var _ctrlKey = localDict["ctrlKey"]
	  , _shiftKey = localDict["shiftKey"]
	  , _altKey = localDict["altKey"]
	  , _metaKey = localDict["metaKey"]
	  , modifiersListArg = ("" + _ctrlKey && "Control" + _shiftKey && " Shift" + _altKey && " Alt" + _metaKey && " Meta").trim()

	  , _key = localDict["key"]
	  , _char = localDict["char"]
	  , _location = localDict["location"]
	  , _keyCode = _key && _key.charCodeAt(0) || 0 //TODO:: more powerfull key to charCode

	  , _bubbles = localDict["bubbles"]
	  , _cancelable = localDict["cancelable"]

	  , success_init = false
	;

	_keyCode = localDict["keyCode"] = localDict["keyCode"] || _keyCode;
	localDict["which"] = localDict["which"] || _keyCode;

	
	if("initKeyEvent" in e) {
		//https://developer.mozilla.org/en/DOM/event.initKeyEvent

		e.initKeyEvent(type, _bubbles, _cancelable, global, 
                        _ctrlKey, _altKey, _shiftKey, _metaKey, 
                        _keyCode, _keyCode);
		success_init = true;
	}
	else if("initKeyboardEvent" in e) {
		//http://msdn.microsoft.com/en-us/library/ie/ff975297(v=vs.85).aspx
		//https://developer.mozilla.org/en/DOM/KeyboardEvent#initKeyboardEvent()

		/*
		http://stackoverflow.com/a/8490774/1437207
		For Webkit-based browsers (Safari/Chrome), the event initialization call should look a bit differently (see https://bugs.webkit.org/show_bug.cgi?id=13368):
		initKeyboardEvent(in DOMString typeArg, 
              in boolean canBubbleArg, 
              in boolean cancelableArg, 
              in views::AbstractView viewArg, 
              in DOMString keyIdentifierArg, 
              in unsigned long keyLocationArg, 
              in boolean ctrlKeyArg, 
              in boolean shiftKeyArg, 
              in boolean altKeyArg, 
              in boolean metaKeyArg, 
              in boolean altGraphKeyArg);
		*/
		if(_try_initKeyboardEvent) {
			try {
				e.initKeyboardEvent(type, _bubbles, _cancelable, global, _char, _key, _location, modifiersListArg, localDict["repeat"], "");			
				success_init = true;
			}
			catch(__e__) {
				_try_initKeyboardEvent = false;
			}
		}
	}
	

	if(!success_init)e.initEvent(type, _bubbles, _cancelable, global);

	for(_prop_name in _valid_initKeyboardEvent_dictionary_properties)if(_hasOwnProperty(_valid_initKeyboardEvent_dictionary_properties, _prop_name)) {
		if(e[_prop_name] != localDict[_prop_name]) {
			delete e[_prop_name];
			_Object_defineProperty(e, _prop_name, { writable : true, "value" : localDict[_prop_name] });
		}
	}
	
	if(!("isTrusted" in e))e.isTrusted = false;

	return e;
}