f

/** @const @type {boolean} */
var DEBUG = IS_DEBUG;

/** Browser sniffing
 * @type {boolean} */
var _browser_msie;
_browser_msie = (_browser_msie = /msie (\d+)/i.exec(navigator.userAgent)) && +_browser_msie[1] || void 0;





if(!global["Element"])((global["Element"] =
//Reprisent ActiveXObject as Node, Element and HTMLElement so `<element> instanceof Node` is working (!!!But no in IE9 with in "compatible mode")
	ActiveXObject
).prototype)["ie"] = true;//fake prototype for IE < 8
if(!global["HTMLElement"])global["HTMLElement"] = global["Element"];//IE8
if(!global["Node"])global["Node"] = global["Element"];//IE8



var _temoObj;
//Not sure if it wrong. TODO:: tests for this
if(!global["DocumentFragment"]) {

	global["DocumentFragment"] = 
		global["Document"] || global["HTMLDocument"] ||//For IE8
		(_temoObj = {}, _temoObj.prototype = {}, _temoObj);//For IE < 8

}
if(!global["Document"])global["Document"] = global["DocumentFragment"];



global["_"] = {
	"ielt9shims" : [],
	"orig_" : global["_"]//Save original "_" - we will restore it in a.js
};

//"_" - container for shims what should be use in a.js
var _ = global["_"]["ielt9shims"]
	
  , __temporary__DOMContentLoaded_container = {}

	/** @const */
  , document_createDocumentFragment = document.createDocumentFragment

	/** @const */
  , document_createElement = document.createElement

	/** @const */
  , document_createTextNode = document.createTextNode

	/** @const */
  , _document_documentElement = document.documentElement

	/** @const */
  , _throwDOMException = function(errStr) {
		var ex = Object.create(DOMException.prototype);
		ex.code = DOMException[errStr];
		ex.message = errStr +': DOM Exception ' + ex.code;
		throw ex;
	}

	/** @const */
  , _recursivelyWalk = function (nodes, cb) {
		for (var i = 0, len = nodes.length; i < len; i++) {
			var node = nodes[i],
				ret = cb(node);
			if (ret) {
				return ret;
			}
			if (node.childNodes && node.childNodes.length > 0) {
				ret = _recursivelyWalk(node.childNodes, cb);
				if (ret) {
					return ret;
				}
			}
		}
	}

	/** @const */
  , _append = function(obj, extention) {
		for(var key in extention)
			if(_hasOwnProperty(extention, key) && !_hasOwnProperty(obj, key))
				obj[key] = extention[key];
		
		return obj;
	}

	/** @const */
  , _safeExtend = function(obj, extention) {
		for(var key in extention)
			if(_hasOwnProperty(extention, key) && obj[key] !== extention[key])
				try {//prevent IE error "invalid argument."
					obj[key] = extention[key];
				}
				catch(e) { }
		
		return obj;
	}

  	/**
  	 *  @const
     * Use native and probably broken function or Quick, but non-full-standart
	 * For system use only
	 * More standart solution in a.js
	 */
  , _String_trim = String.prototype.trim || (String.prototype.trim = function () {//Cache origin trim function
		var	str = this.replace(/^\s+/, ''),
			ws = RE_space,
			i = str.length;
		while (ws.test(str.charAt(--i))){};
		return str.slice(0, i + 1);
	})
	
	/** @const */
  , _String_split = String.prototype.split

	/** @const */
  , _String_substr = String.prototype.substr

	/** @const */
  , _Array_slice = Array.prototype.slice

	/** @const */
  , _Array_splice = Array.prototype.splice

	/** @const */
  , _Function_apply = Function.prototype.apply

	/** @const */
  , _Function_call = Function.prototype.call
	
	/** Use native "bind" or unsafe bind for service and performance needs
	 * @const
	 * @param {Object} object
	 * @param {...} var_args
	 * @return {Function} */
  , _unSafeBind = Function.prototype.bind || function(object, var_args) {
		var __method = this,
			args = _Array_slice.call(arguments, 1);
		return function () {
			return _Function_apply.call(__method, object, args.concat(_Array_slice.call(arguments)));
		}
	} 
	
	/** @const */
  , _hasOwnProperty = _unSafeBind.call(Function.prototype.call, Object.prototype.hasOwnProperty)
  
	/**
	 * @const
	 * Call _function
	 * @param {Function} _function function to call
	 * @param {*} context
	 * @param {...} var_args
	 * @return {*} mixed
	 * @version 2
	 */
  , _call = function(_function, context, var_args) {
		// If no callback function or if callback is not a callable function
		// it will throw TypeError
       return _Function_apply.call(_function, context, _Array_slice.call(arguments, 2))
	}

  	/** @type {Node} */
  , _testElement = document.createElement('p')

  , _txtTextElement
	
  , _Node_prototype = global["Node"].prototype
	
  , _Element_prototype = global["Element"].prototype

	/** @const */
  , _Node_contains = _Node_prototype.contains || _testElement.contains

	/** @const */
  , _Native_Date = Date

	/** @const @type {RegExp} */
  , RE_cloneElement_tagMatcher = /^\<([\w\:\-]*)[\>\ ]/i
	
	/** @const @type {RegExp} */
  , RE_space = /\s/
	
	/** @const @type {RegExp} */
  , RE__String_trim_spaces = /^\s\s*/
	
	/** @type {boolean} */
  , _String_split_shim_isnonparticipating

	/** @type {*} */
  , tmp

	/** @type {Function} */
  , function_tmp

  , nodeList_methods_fromArray = ["every", "filter", "forEach", "indexOf", "join", "lastIndexOf", "map", "reduce", "reduceRight", "reverse", "slice", "some", "toString"]

	// ------------------------------ ==================  Events  ================== ------------------------------
  , _event_eventHandlersContainer_by_sourceIndex = {}

  , _fake_Event_prototype = {
	  	/** @const @type {function} */
	  	"preventDefault" : function(){this.returnValue = false} ,
	  	/** @const @type {function} */
	  	"stopPropagation" : function(){this.cancelBubble = true} ,
	  	/** @const @type {function} */
	  	"stopImmediatePropagation" : function() {
			this["__stopNow"] = true;
			this.stopPropagation()
		}
	}

  , _Event_prototype

	/** @const @type {string} */
  , _event_UUID_prop_name = "uuid"

	/** @type {number} unique indentifier for event listener */
  , _event_UUID = 1//MUST be more then 0 | 0 - using for DOM0 events

	/** @const @type {string} */
  , _event_handleUUID = "_h_9e2"

	/** @const @type {string} */
  , _event_eventsUUID = "_e_8vj"

	// ------------------------------ ==================  HTML5 shiv  ================== ------------------------------

  , html5_elements = 'abbr|article|aside|audio|canvas|command|datalist|details|figure|figcaption|footer|header|hgroup|keygen|mark|meter|nav|output|progress|section|source|summary|time|video'

  , html5_elements_array = html5_elements.split('|')
	
	/* Not all elements can be cloned in IE (this list can be shortend) **/
  , ielt9_elements = /^<|^(?:a|b|button|code|div|fieldset|form|map|h1|h2|h3|h4|h5|h6|i|object|iframe|img|input|label|li|link|ol|option|p|param|q|script|select|span|strong|style|table|tbody|td|textarea|tfoot|th|thead|tr|ul|optgroup)$/i

	// feature detection: whether the browser supports unknown elements
	/** @type {boolean}*/
  , supportsUnknownElements
	
  , safeFragment

	/** @type {Node} */
  , safeElement

  , _nativeCloneNode
;







//Emulating HEAD for ie < 9
document.head || (document.head = document.getElementsByTagName('head')[0]);

document.defaultView || (document.defaultView = global);

if(DEBUG) {
	//test DOMElement is an ActiveXObject
	if(!(_Function_call.call(document_createElement, document, "div") instanceof ActiveXObject))
		console.error("DOMElement is not an ActiveXObject. Probably you in IE > 8 'compatible mode'. <element> instanceof [Node|Element|HTMLElement] wouldn't work");
}


if(!global["Event"])global["Event"] = {};
_Event_prototype = global["Event"].prototype || (global["Event"].prototype = {});
_append(_Event_prototype, _fake_Event_prototype);

/*  >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>  Function.prototype  ==================================  */
/*  =======================================================================================  */


//Fix Function.prototype.apply to work with generic array-like object instead of an array
// test: (function(a,b){console.log(a,b)}).apply(null, {0:1,1:2,length:2})
tmp = false;
try {
	tmp = isNaN.apply(null, {})
}
catch(e) { }
if(!tmp) {
	Function.prototype.apply = function(contexts, args) {
		try {
			return args != void 0 ?
				_Function_apply.call(this, contexts, args) :
				_Function_apply.call(this, contexts);
		}
		catch (e) {
			if(e["number"] != -2146823260 ||//"Function.prototype.apply: Arguments list has wrong type"
				args.length === void 0 || //Not an iterable object
			   typeof args === "string"//Avoid using String
			  )
				throw e;

			return _Function_apply.call(this, contexts, Array["from"](args));
		}
	};
}

/*  >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>  Function.prototype  ==================================  */
/*  =======================================================================================  */


/*  >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>  String.prototype  ==================================  */
/*  =======================================================================================  */

//[BUGFIX, IE lt 9] IE < 9 substr() with negative value not working in IE
if("ab".substr(-1) !== "b") {
	//String.prototype._itlt9_substr_ = String.prototype.substr;
	String.prototype.substr = function(start, length) {
		return _String_substr.call(this, start < 0 ? (start = this.length + start) < 0 ? 0 : start : start, length);
	}
}

/*
[BUGFIX, IE lt 9, old safari] http://blog.stevenlevithan.com/archives/cross-browser-split
More better solution:: http://xregexp.com/
*/
if('te'.split(/(s)*/)[1] != void 0 ||
   '1_1'.split(/(_)/).length != 3) {
   _String_split_shim_isnonparticipating = /()??/.exec("")[1] === void 0; // NPCG: nonparticipating capturing group
   
	String.prototype.split = function (separator, limit) {
		var str = this;
		// if `separator` is not a regex, use the native `split`
		if(!(separator instanceof RegExp)) {//if (Object.prototype.toString.call(separator) !== "[object RegExp]") {
			//http://es5.github.com/#x15.5.4.14
			//If separator is undefined, then the result array contains just one String, which is the this value (converted to a String). If limit is not undefined, then the output array is truncated so that it contains no more than limit elements.
			if(separator === void 0 && limit === 0)return [];
			
			return _String_split.call(str, separator, limit);
		}

		var output = [],
			lastLastIndex = 0,
			flags = (separator.ignoreCase ? "i" : "") +
					(separator.multiline  ? "m" : "") +
					(separator.sticky     ? "y" : ""),
			separator1 = new RegExp(separator.source, flags + "g"), // make `global` and avoid `lastIndex` issues by working with a copy
			separator2 = null, match, lastIndex, lastLength;

		str = str + ""; // type conversion
		if (!_String_split_shim_isnonparticipating) {
			separator2 = new RegExp("^" + separator1.source + "$(?!\\s)", flags); // doesn't need /g or /y, but they don't hurt
		}

		/* behavior for `limit`: if it's...
		- `undefined`: no limit.
		- `NaN` or zero: return an empty array.
		- a positive number: use `Math.floor(limit)`.
		- a negative number: no limit.
		- other: type-convert, then use the above rules. */
		if (limit === void 0 || +limit < 0) {
			limit = Infinity;
		} else {
			limit = Math.floor(+limit);
			if (!limit) {
				return [];
			}
		}		
		
		while (match = separator1.exec(str)) {
			lastIndex = match.index + match[0].length; // `separator1.lastIndex` is not reliable cross-browser

			if (lastIndex > lastLastIndex) {
				output.push(str.slice(lastLastIndex, match.index));

				// fix browsers whose `exec` methods don't consistently return `undefined` for nonparticipating capturing groups
				// __ NOT WORKING __ !!!!
				if (!_String_split_shim_isnonparticipating && match.length > 1) {
					match[0].replace(separator2, function() {
						for (var i = 1, a = arguments, l = a.length - 2; i < l; i++) {//for (var i = 1; i < arguments.length - 2; i++) {
							if (a[i] === void 0) {
								match[i] = void 0;
							}
						}
					});
				}

				if (match.length > 1 && match.index < str.length) {
					output.push.apply(output, match.slice(1));//Array.prototype.push.apply(output, match.slice(1));
				}

				lastLength = match[0].length;
				lastLastIndex = lastIndex;

				if (output.length >= limit) {
					break;
				}
			}

			if (separator1.lastIndex === match.index) {
				separator1.lastIndex++; // avoid an infinite loop
			}
		}

		if (lastLastIndex === str.length) {
			if (lastLength || !separator1.test("")) {
				output.push("");
			}
		} else {
			output.push(str.slice(lastLastIndex));
		}

		return output.length > limit ? output.slice(0, limit) : output;
	}
}


/*  >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>  String.prototype  ==================================  */
/*  =======================================================================================  */



/*  >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>  Exception  ==================================  */
/*  =======================================================================================  */
if(!global["DOMException"]) {
	var p = (global["DOMException"] = function() { }).prototype = new Error;
	p.INDEX_SIZE_ERR = 1;
	//p.DOMSTRING_SIZE_ERR = 2; // historical
	p.HIERARCHY_REQUEST_ERR = 3;
	p.WRONG_DOCUMENT_ERR = 4;
	p.INVALID_CHARACTER_ERR = 5;
	//p.NO_DATA_ALLOWED_ERR = 6; // historical
	p.NO_MODIFICATION_ALLOWED_ERR = 7;
	p.NOT_FOUND_ERR = 8;
	p.NOT_SUPPORTED_ERR = 9;
	//p.INUSE_ATTRIBUTE_ERR = 10; // historical
	p.INVALID_STATE_ERR = 11;
	p.SYNTAX_ERR = 12;
	p.INVALID_MODIFICATION_ERR = 13;
	p.NAMESPACE_ERR = 14;
	p.INVALID_ACCESS_ERR = 15;
	//p.VALIDATION_ERR = 16; // historical
	p.TYPE_MISMATCH_ERR = 17;
}

/*  >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>  Exception  ==================================  */
/*  =======================================================================================  */

/*  ======================================================================================  */
/*  ======================================  Window  <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<  */

//http://javascript.gakaa.com/window-scrollx-2-0-scrolly.aspx
if(!("pageXOffset" in global)) {
	_.push(function() {
		var _getScrollX = document.compatMode === "CSS1Compat" ? function(){return document.body.parentNode.scrollLeft} : function(){return document.body.scrollLeft};
		var _getScrollY = document.compatMode === "CSS1Compat" ? function(){return document.body.parentNode.scrollTop} : function(){return document.body.scrollTop};

		Object.defineProperty(global, "pageXOffset", {"get" : _getScrollX});
		Object.defineProperty(global, "pageYOffset", {"get" : _getScrollY});
	});
}

/*  >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>  Window  ======================================  */
/*  ======================================================================================  */

/*  ======================================================================================  */
/*  ======================================  Events  <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<  */

//fix [add|remove]EventListener & dispatchEvent for IE < 9

// TODO: https://github.com/arexkun/Vine
//		 https://github.com/kbjr/Events.js


function fixEvent(event) {
	var thisObj = this,
		_button = ("button" in event) && event.button;
	
	// один объект события может передаваться по цепочке разным обработчикам
	// при этом кроссбраузерная обработка будет вызвана только 1 раз
	// Снизу, в функции commonHandle,, мы должны проверять на !event["__isFixed"]
	event["__isFixed"] = true;// пометить событие как обработанное

	//http://javascript.gakaa.com/event-detail.aspx
	//http://www.w3.org/TR/2011/WD-DOM-Level-3-Events-20110531/#event-type-click
	//indicates the current click count; the attribute value must be 1 when the user begins this action and increments by 1 for each click.
	if(event.type === "click" || event.type === "dblclick") {
		if(event.detail === void 0)event.detail = event.type === "click" ? 1 : 2;
		if(!event.button && fixEvent["__b"] !== void 0)_button = fixEvent["__b"];
	}

	_append(event, _Event_prototype);

	event.target || (event.target = event.srcElement || document);// добавить target для IE
	/*
	if ( event.target && (/3|4/).test( event.target.nodeType ) ) {
		event.target = event.target.parentNode;
	}
	*/

	// добавить relatedTarget в IE, если это нужно
	if(event.relatedTarget === void 0 && event.fromElement)
		event.relatedTarget = event.fromElement == event.target ? event.toElement : event.fromElement;
	/*
	event.relatedTarget = event.relatedTarget ||
		event.type == 'mouseout' ? event.toElement :
		event.type == 'mouseover' ? event.fromElement : null;
	*/

	// вычислить pageX/pageY для IE
	if(event.pageX == null && event.clientX != null) {
		var html = _document_documentElement, body = document.body;
		/*event.pageX = event.clientX + (html && html.scrollLeft || body && body.scrollLeft || 0) - (html.clientLeft || 0);
		event.pageY = event.clientY + (html && html.scrollTop || body && body.scrollTop || 0) - (html.clientTop || 0);*/
		//Новая вервия нуждающаяся в проверки
		event.pageX = event.clientX + (window.pageXOffset || html.scrollLeft || body.scrollLeft || 0) - (html.clientLeft || 0);
		event.pageY = event.clientY + (window.pageYOffset || html.scrollTop || body.scrollTop || 0) - (html.clientTop || 0);
	}

	//Add 'which' for click: 1 == left; 2 == middle; 3 == right
	//Unfortunately the event.button property is not set for click events. It is however set for mouseup/down/move ... but not click | http://bugs.jquery.com/ticket/4164
	if(!event.which && _button)event.which = _button & 1 ? 1 : _button & 2 ? 3 : _button & 4 ? 2 : 0;

	if(!event.timeStamp)event.timeStamp = +new _Native_Date();
	
	if(!event.eventPhase)event.eventPhase = (event.target == thisObj) ? 2 : 3; // "AT_TARGET" = 2, "BUBBLING_PHASE" = 3
	
	if(!event.currentTarget)event.currentTarget = thisObj;
		
		
	// событие DOMAttrModified
	//  TODO:: недоделано
	// TODO:: Привести event во всех случаях (для всех браузеров) в одинаковый вид с newValue, prevValue, propName и т.д.
	if(!event.attrName && event.propertyName)event.attrName = _String_split.call(event.propertyName, '.')[0];//IE При изменении style.width в propertyName передаст именно style.width, а не style, как нам надо

	return event
}

// вспомогательный универсальный обработчик. Вызывается в контексте элемента всегда this = element
function commonHandle(nativeEvent) {
	if(fixEvent === void 0) {//фильтруем редко возникающую ошибку, когда событие отрабатывает после unload'а страницы. 
		return;
	}

	var thisObj = this,
		_ = thisObj["_"],
		errors = [],//Инициализуется массив errors для исключений
		errorsMessages = [],
		event;
	
	if((!_ || !_[_event_eventsUUID])) {
		if(!("__dom0__" in nativeEvent))return;
		else {
			_ || (_ = {});
			_[_event_eventsUUID] || (_[_event_eventsUUID] = {});
		}
	}
	
	// получить объект события и проверить, подготавливали мы его для IE или нет
	nativeEvent || (nativeEvent = window.event);
	if(!nativeEvent["__isFixed"])nativeEvent = fixEvent.call(thisObj, nativeEvent);

	// save event properties in fake 'event' object to allow store 'event' and use it in future
	if(!nativeEvent["__custom_event"])(event = _safeExtend(new Event(nativeEvent.type), nativeEvent))["__custom_event"] = true;
	else event = nativeEvent;


	var handlers = _[_event_eventsUUID][event.type];
	if("__dom0__" in nativeEvent) {
		(handlers || (handlers = []))[0] = nativeEvent["__dom0__"];
	}

	if(!handlers)return;

	for(var g in handlers)if(_hasOwnProperty(handlers, g)) {
		var handler = handlers[g],
			context;

		if(typeof handler === "object") {
			context = handler;
			handler = handler.handleEvent;
		}

		try {
			//Передаём контекст и объект event, результат сохраним в event['result'] для передачи значения дальше по цепочке
			if(
				(
					event['result'] = _Function_call.call(handler, context || thisObj, event)
				)
				=== false
			  ) {//Если вернели false - остановим обработку функций
				event.preventDefault();
				event.stopPropagation();
			}
		}
		catch(e) {
			errors.push(e);//Все исключения - добавляем в массив, при этом не прерывая цепочку обработчиков.
			errorsMessages.push(e.message);
			if(console)console.error(e);
		}

		if(event["__stopNow"])break;//Мгновенная остановка обработки событий
	}

	//return changed properties in native 'event' object
	nativeEvent.returnValue = event.returnValue;
	nativeEvent.cancelBubble = event.cancelBubble;
	//TODO:: check out that properties need to be returned in native 'event' object or _extend(nativeEvent, event);
	
	if(errors.length == 1) {//Если была только одна ошибка - кидаем ее дальше
		throw errors[0]
	}
	else if(errors.length > 1) {//Иначе делаем общий объект Error со списком ошибок в свойстве errors и кидаем его
		var e = new Error("Multiple errors thrown : " + event.type + " : " + " : " + errorsMessages.join("|"));
		e.errors = errors;
		throw e;
	}
}



if(!document.addEventListener) {
	_Node_prototype.addEventListener = global.addEventListener = document.addEventListener = function(_type, _handler, useCapture) {
		//TODO:: useCapture == true
		if(typeof _handler != "function" &&
		   !(typeof _handler === "object" && _handler.handleEvent)//Registering an EventListener with a function object that also has a handleEvent property -> Call EventListener as a function
		  ) {
			return;
		}
		
		var /** @type {Node} */
			thisObj = this,
			/** @type {Object} */
			_ = thisObj["_"],
			/** @type {Function} */
			_callback,
			/** @type {boolean} */
			_useInteractive = false;
			/* * @ type {number} 
			_event_phase = useCapture ? 1 : 3;*/
			
		if(!_)_ = thisObj["_"] = {};
		//_ = _[_event_phase] || (_[_event_phase] = {});
		
		if(_type === "DOMContentLoaded") {//IE
			if (document.readyState == 'complete')return;

			if(thisObj === global)thisObj = document;

			_useInteractive = true;
			
			if(!__temporary__DOMContentLoaded_container[_type]) {
				__temporary__DOMContentLoaded_container[_type] = true;
				/*var a = document.getElementById("__ie_onload");
				if(!a) {
					document.write("<script id=\"__ie_onload\" defer=\"defer\" src=\"javascript:void(0)\"><\/script>");
					a = document.getElementById("__ie_onload");
					a.onreadystatechange = function(e) {
						var n = this;
						if(n.readyState == "complete") {
							if(n.alreadyDone)return;
							n.alreadyDone = true;
							commonHandle.call(thisObj, {"type" : _type});
						}
					}
				}*/

				///document.attachEvent( "onreadystatechange", DOMContentLoaded ); if ( !ready && document.readyState === "complete" ) {


				function poll() {
					try { document.documentElement.doScroll('left'); } catch(e) { setTimeout(poll, 50); return; }
					commonHandle.call(thisObj, {"type" : _type});
				};

				if ("createEventObject" in document && "doScroll" in document.documentElement) {
					try { if(!global.frameElement)poll() } catch(e) { }
				}
			}
		}
		/* TODO:: DOMAttrModified
		else if(_type == "DOMAttrModified") {
		
		}
		*/
		else if(_type === "load" && "tagName" in thisObj && thisObj.tagName.toUpperCase() === "SCRIPT") {//[script:onload]
			//FROM https://github.com/jrburke/requirejs/blob/master/require.js
			//Probably IE. IE (at least 6-8) do not fire
			//script onload right after executing the script, so
			//we cannot tie the anonymous define call to a name.
			//However, IE reports the script as being in "interactive"
			//readyState at the time of the define call.
			_useInteractive = true;
			
			//Need to use old school onreadystate here since
			//when the event fires and the node is not attached
			//to the DOM, the evt.srcElement is null, so use
			//a closure to remember the node.
			thisObj.onreadystatechange = function (evt) {
				evt = evt || window.event;
				//Script loaded but not executed.
				//Clear loaded handler, set the real one that
				//waits for script execution.
				if (thisObj.readyState === 'loaded') {
					thisObj.onreadystatechange = null;
					thisObj.attachEvent("onreadystatechange", _unSafeBind.call(commonHandle, thisObj, {"type" : _type}));
				}
			};
			_type = "readystatechange";
		}
		else if(_type === "DOMMouseScroll")_type = "mousewheel";//TODO:: Test it
		
		/*
		TODO::
		Reference: http://www.w3.org/TR/DOM-Level-2-Events/events.html#Events-EventTarget
		If multiple identical EventListeners are registered on the same EventTarget with the same parameters the duplicate instances are discarded. They do not cause the EventListener to be called twice and since they are discarded they do not need to be removed with the removeEventListener method.
		*/
		
		
		// исправляем небольшой глюк IE с передачей объекта window
		if(thisObj.setInterval && (thisObj != global && !thisObj["frameElement"]))thisObj = global;
		
		//Назначить функции-обработчику уникальный номер. По нему обработчик можно будет легко найти в списке events[type].
		if(!_handler[_event_UUID_prop_name])_handler[_event_UUID_prop_name] = ++_event_UUID;
		
		//Инициализовать служебную структуру events и обработчик _[handleUUID]. 
		//Основная его задача - передать вызов универсальному обработчику commonHandle с правильным указанием текущего элемента this. 
		//Как и events, _[handleUUID] достаточно инициализовать один раз для любых событий.
		if(!(_callback = _[_event_handleUUID])) {
			_callback = _[_event_handleUUID] = _unSafeBind.call(commonHandle, thisObj);
		}

		//Если обработчиков такого типа событий не существует - инициализуем events[type] и вешаем
		// commonHandle как обработчик на elem для запуска браузером по событию type.
		if(!_[_event_eventsUUID])_[_event_eventsUUID] = {};
		if(!_[_event_eventsUUID][_type]) {
			_[_event_eventsUUID][_type] = {};
			
			if(!_useInteractive)//[script:onload]
				thisObj.attachEvent('on' + _type, _callback);
		}
		
		//Добавляем пользовательский обработчик в список elem[_event_eventsUUID][type] под заданным номером. 
		//Так как номер устанавливается один раз, и далее не меняется - это приводит к ряду интересных фич.
		// Например, запуск add с одинаковыми аргументами добавит событие только один раз.
		_[_event_eventsUUID][_type][_handler[_event_UUID_prop_name]] = _handler;
	};

	_Node_prototype.removeEventListener = global.removeEventListener = document.removeEventListener = function(_type, _handler, useCapture) {
		var /** @type {Node} */
			thisObj = this,
			/** @type {Object} */
			_ = thisObj["_"];
			/** @type {number} 
			_event_phase = useCapture ? 1 : 3;*/
		
		if(typeof _handler != "function" || !_handler.guid || !_)return;

		//_ = _[_event_phase] || (_[_event_phase] = {});
		//if(!_)return;

		var handlers = _[_event_eventsUUID] && _[_event_eventsUUID][_type];//Получить список обработчиков
		
		delete handlers[_handler.guid];//Удалить обработчик по его номеру

		for(var any in handlers)if(_hasOwnProperty(handlers, any))return;//TODO: проверить, что тут делается. Глупость какая-то.Проверить, не пуст ли список обработчиков
		//Если пуст, то удалить служебный обработчик и очистить служебную структуру events[type]
		thisObj.detachEvent("on" + _type, commonHandle);

		delete _[_event_eventsUUID][_type];

		//Если событий вообще не осталось - удалить events за ненадобностью.
		for(var any in _[_event_eventsUUID])if(_hasOwnProperty(_[_event_eventsUUID], any))return;
		
		delete _[_event_eventsUUID];
	};

	document.attachEvent("onmousedown", function(){
		fixEvent["__b"] = event.button
	});
	document.attachEvent("onclick", function(){
		fixEvent["__b"] = void 0
	});
}

/**
dispatchEvent
This method allows the dispatch of events into the implementations event model. Events dispatched in this manner will have the same capturing and bubbling behavior as events dispatched directly by the implementation. The target of the event is the EventTarget on which dispatchEvent is called. 
Parameters 
evt of type Event
Specifies the event type, behavior, and contextual information to be used in processing the event.
Return Value 
boolean	
The return value of dispatchEvent indicates whether any of the listeners which handled the event called preventDefault. If preventDefault was called the value is false, else the value is true.

Exceptions 
EventException	
UNSPECIFIED_EVENT_TYPE_ERR: Raised if the Event's type was not specified by initializing the event before dispatchEvent was called. Specification of the Event's type as null or an empty string will also trigger this exception
 * @param {(Event|CustomEvent)} _event is an event object to be dispatched.
 * @this {Element} is the target of the event.
 * @return {boolean} The return value is false if at least one of the event handlers which handled this event called preventDefault. Otherwise it returns true.
 */
if(!document.dispatchEvent)_Node_prototype.dispatchEvent = global.dispatchEvent = document.dispatchEvent = function(_event) {
	if(!_event.type)return true;
	/**
	 * @type {Node}
	 */
	var thisObj = this;
	
	try {
		return thisObj.fireEvent("on" + _event.type, _event);
	}
	catch(e) {
		//Shim for Custome events in IE < 9
		if(e["number"] === -2147024809 ||//"invalid argument."
		   thisObj === global) {		 //window has not 'fireEvent' method
			_event["__custom_event"] = true;
			var node = _event.target = thisObj,
				dom0event = "on" + _event.type,
				result;

			//Всплываем событие
			while(!_event.cancelBubble && node) {//Если мы вызвали stopPropogation() - больше не всплываем событие
				if((dom0event in node && typeof node[dom0event] == "function" && (_event["__dom0__"] = node[dom0event])) ||
				   ("_" in node && _event_eventsUUID in node["_"]))//Признак того, что на элемент могли навесить событие
					commonHandle.call(node, _event);
				//Если у события отключено всплытие - не всплываем его
				node = _event.bubbles ? (node === document ? document.defaultView : node.parentNode) : null;
				if("__dom0__" in _event)_event["__dom0__"] = void 0;
			}

			result = !_event.cancelBubble;
			_event = null;
			
			return result;
		}
		else throw e;
	}
};

if(!document.createEvent) {/*IE < 9 ONLY*/
	/**
	 * @param {string=} _type
	 * @param {boolean=} _bubbles
	 * @param {boolean=} _cancelable
	 */
	function _initEvent(_type, _bubbles, _cancelable) {
		if(_type == void 0 || _bubbles == void 0 || _cancelable == void 0) {
			//WRONG_ARGUMENTS_ERR
			throw new Error('WRONG_ARGUMENTS_ERR');
		}
		var thisObj = this;
	
		thisObj.type = _type;
		//this.cancelBubble = //TODO:: <-- testing Глупость ???
		//	!(this.bubbles = _bubbles);
		thisObj.bubbles = _bubbles;
		thisObj.cancelable = _cancelable;//https://developer.mozilla.org/en/DOM/event.cancelable
		
		thisObj.isTrusted = false;
		thisObj.target = null;

		if(!thisObj.timeStamp)thisObj.timeStamp = +new _Native_Date();
	}
	function _initCustomEvent(_type, _bubbles, _cancelable, _detail) {
		//https://developer.mozilla.org/en/DOM/CustomEvent
		_initEvent.call(this, _type, _bubbles, _cancelable);
		
		this.detail = _detail;
	}
	function _initUIEvent(_type, _bubbles, _cancelable, _view, _detail) {
		//https://developer.mozilla.org/en/DOM/event.initUIEvent
		_initCustomEvent.call(this, _type, _bubbles, _cancelable, _detail);
		
		this.view = _view;
	}
	function _initMouseEvent(_type, _bubbles, _cancelable, _view, 
                     _detail, _screenX, _screenY, _clientX, _clientY, 
                     _ctrlKey, _altKey, _shiftKey, _metaKey, 
                     _button, _relatedTarget) {
		var thisObj = this;
		//https://developer.mozilla.org/en/DOM/event.initMouseEvent
		_initUIEvent.call(thisObj, _type, _bubbles, _cancelable, _view, _detail);
		
		thisObj.screenX = _screenX;
		thisObj.screenY = _screenY;
		thisObj.clientX = _clientX;
		thisObj.clientY = _clientY;
        thisObj.ctrlKey = _ctrlKey;
		thisObj.altKey = _altKey;
		thisObj.shiftKey = _shiftKey;
		thisObj.metaKey = _metaKey;
		thisObj.button = _button;
		thisObj.relatedTarget = _relatedTarget;
	}

	/**
	 * https://developer.mozilla.org/en/DOM/document.createEvent
	 * Not using. param {string} eventType is a string that represents the type of event to be created. Possible event types include "UIEvents", "MouseEvents", "MutationEvents", and "HTMLEvents". See https://developer.mozilla.org/en/DOM/document.createEvent#Notes section for details.
	 */
	document.createEvent = function() {
		var eventObject;
		
		eventObject = document.createEventObject();
		
		eventObject.returnValue = true;//default value
		eventObject.initEvent = _initEvent;
		eventObject.initCustomEvent = _initCustomEvent;
		eventObject.initUIEvent = _initUIEvent;
		eventObject.initMouseEvent = _initMouseEvent;
		
		return eventObject;
	}
}

/*  >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>  Events  ======================================  */
/*  ======================================================================================  */


/*  ======================================================================================  */
/*  ========================================  DOM  <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<  */

/*  ================================ bug fixing  <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<  */


// IE - contains fails if argument is textnode
_txtTextElement = _Function_call.call(document_createTextNode, document, "");
_testElement.appendChild(_txtTextElement);

try {
    _testElement.contains(_txtTextElement);
    tmp = false;
} catch (e) {
	tmp = true;
	_Node_prototype.contains = function contains(other) {
    	if(other.nodeType === 3) {
		    return _recursivelyWalk(this.childNodes, function (node) {
		         if (node === other) return true;
		    }) || false;
		}
		else return _Function_call.call(_Node_contains, this, other);
	};
}

// IE8 hurr durr doctype is null
if (document.doctype === null && _browser_msie > 7)//TODO:: this fix for IE < 8
	_.push(function() {
		var documentShim_doctype = document.childNodes[0];
		Object.defineProperty(documentShim_doctype, "nodeType", {
			get: function () { return 10 } 
		});
	    Object.defineProperty(document, "doctype", {configurable : true, enumerable : false, get : function () { return documentShim_doctype } });
	});

// IE8 hates you and your f*ing text nodes
// I mean text node and document fragment and document no inherit from node
// Extend Text.prototype and HTMLDocument.prototype with shims
// TODO:: Do something with IE < 8
if(!_Node_prototype.contains)_Node_prototype.contains = _Node_contains;
if (!_Function_call.call(document_createTextNode, document, "").contains){
	if(global["Text"] && global["Text"].prototype) {//IE8
	    _.push(_unSafeBind.call(_append, null, Text.prototype, _Node_prototype));
	}
	else {//IE < 8 TODO:: tests
		document.createTextNode = function(text) {
			text = _Function_call.call(document_createTextNode, this, text);
			text.contains = _Node_prototype.contains;
			return text;
		}
	}
}
if (!_Function_call.call(document_createDocumentFragment, document).contains && global["HTMLDocument"] && global["HTMLDocument"].prototype) {
    _.push(_unSafeBind.call(_append, null, global["HTMLDocument"].prototype, _Node_prototype));
}


//https://developer.mozilla.org/en/DOM/Element.children
//[IE lt 9] Fix "children" property in IE < 9
if(!("children" in _testElement) || _browser_msie < 9)_.push(function() {
	Object.defineProperty(_Element_prototype, "children", {"get" : function() {
		var arr = [],
			child = this.firstChild;

		while(child) {
			if(child.nodeType == 1)arr.push(child);
			child = child.nextSibling;
		}

		return arr;
	}});
})

//[IE lt 9] Fix "offsetLeft" and "offsetTop" properties in IE < 9
if(_browser_msie < 9)_.push(function() {
	/**
	 * @param {Node} elem
	 * @param {boolean=} X_else_Y
	 * @return {number}
	 */
	function unsafeGetOffsetRect(elem, X_else_Y) {
		var box = elem.getBoundingClientRect(),//It might be an error here
			body = document.body,
			docElem = _document_documentElement;
	 
	 	return X_else_Y ?
	 		Math.round(box.left + (window.pageXOffset || docElem.scrollLeft || body.scrollLeft) - (docElem.clientLeft || body.clientLeft || 0)) :
	 		Math.round(box.top + (window.pageYOffset || docElem.scrollTop || body.scrollTop) - (docElem.clientTop || body.clientTop || 0));
	}

	/**
	 * @param {Node} elem
	 * @param {boolean=} X_else_Y
	 * @return {number}
	 */
	function getOffsetSum(elem, X_else_Y) {
		var result = 0,
			prop = X_else_Y ? "offsetLeft" : "offsetTop";

		while(elem) {
			result = result + parseInt(elem[prop], 10);
			elem = elem.offsetParent;
		}
	 
		return result;
	}

	/**
	 * @param {Node} elem
	 * @param {boolean=} X_else_Y
	 * @return {number}
	 */
	function safeGetOffsetRect(elem, X_else_Y) {
		var result;
		try {
			result = unsafeGetOffsetRect(elem, X_else_Y);
		}
		catch(e) {
			result = getOffsetSum(elem, X_else_Y);
		}
		return result;
	}
	Object.defineProperties(_Element_prototype, {
		"offsetLeft" : {
			"get" : function() {
			    return safeGetOffsetRect(this, true);
			}
		},
		"offsetTop" : {
			"get" : function() {
			    return safeGetOffsetRect(this);
			}
		}
	});
})

//TODO::window.innerWidth & window.innerHeight http://www.javascripter.net/faq/browserw.htm
//TODO::https://developer.mozilla.org/en/DOM/window.outerHeight
	

//[IE lt 9, old browsers] Traversal for IE < 9 and other
if(_testElement.childElementCount == void 0)_.push(function() {
	Object.defineProperties(_Element_prototype, {
		"firstElementChild" : {//https://developer.mozilla.org/en/DOM/Element.firstElementChild
			"get" : function() {
			    var node = this;
			    node = node.firstChild;
			    while(node && node.nodeType != 1) node = node.nextSibling;
			    return node;
			}
		},
		"lastElementChild" : {//https://developer.mozilla.org/En/DOM/Element.lastElementChild
			"get" : function() {
			    var node = this;
			    node = node.lastChild;
			    while(node && node.nodeType != 1) node = node.previousSibling;
			    return node;
			}
		},
		"nextElementSibling" : {//https://developer.mozilla.org/En/DOM/Element.nextElementSibling
			"get" : function() {
			    var node = this;
			    while(node = node.nextSibling) if(node.nodeType == 1) break;
			    return node;
			}
		},
		"previousElementSibling" : {//https://developer.mozilla.org/En/DOM/Element.previousElementSibling
			"get" : function() {
			    var node = this;
			    while(node = node.previousSibling) if(node.nodeType == 1) break;
	    		return node;
			}
		}
	})
});

// IE8 can't write to ownerDocument
/*TODO:: is this realy need?
try {
    _testElement.ownerDocument = 42;
} catch (e) {
	_.push(function() {
	    var pd = Object.getOwnPropertyDescriptor(Element.prototype, "ownerDocument");
	    var ownerDocument = pd.get;
	    Object.defineProperty(Element.prototype, "ownerDocument", {
	        get: function () {
	            if (this._ownerDocument) {
	                return this._ownerDocument;
	            } else {
	                return ownerDocument.call(this);
	            }
	        },
	        set: function (v) {
	            this._ownerDocument = v;
	        },
	        configurable: true
	    });
	})
}*/


/*  >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>  bug fixing  ==================================  */






/* is this stuff defined? */
if(!document.ELEMENT_NODE) {
	tmp = {
		ELEMENT_NODE : 1,
		//ATTRIBUTE_NODE : 2,// historical
		TEXT_NODE : 3,
		//CDATA_SECTION_NODE : 4,// historical
		//ENTITY_REFERENCE_NODE : 5,// historical
		//ENTITY_NODE : 6,// historical
		PROCESSING_INSTRUCTION_NODE : 7,
		COMMENT_NODE : 8,
		DOCUMENT_NODE : 9,
		DOCUMENT_TYPE_NODE : 10,
		DOCUMENT_FRAGMENT_NODE : 11
		//NOTATION_NODE : 12// historical
	};
	_append(document, tmp);
	_append(_Node_prototype, tmp);
	_append(global["Node"], tmp);
}
/*var __ielt8__element_init__ = _Node_prototype["__ielt8__element_init__"];
if(__ielt8__element_init__) {//__ielt8__element_init__ in a.ielt8.js
	__ielt8__element_init__["plugins"].push(function(el) {
		_append(el, tmp);
	})
}*/

//https://developer.mozilla.org/En/DOM/Node.textContent
if(DEBUG && !("textContent" in _testElement)) {
	if(!('innerText' in this) &&
	   (!('data' in this) || !this.appendData))
		throw Error("IE is too old");
}
if(!("textContent" in _testElement))
	_.push(function() {
		Object.defineProperty(_Node_prototype, "textContent", {
			"get" : function() {
				if('innerText' in this)return this.innerText;
				if('data' in this && this.appendData)return this.data;
			},
			"set" : function(val) {
				if('innerText' in this)this.innerText = val;
				else if('data' in this && this.replaceData)this.replaceData(0, this.length, val);
				
				return val;
			}
		});
	});


//https://developer.mozilla.org/en/Document_Object_Model_(DOM)/Node.isEqualNode
if(!("isEqualNode" in _testElement)) {
	document.isEqualNode = _document_documentElement.isEqualNode = _Node_prototype.isEqualNode = function(node) {
		var i, len;

	    if(node === null ||
	       node.nodeType !== this.nodeType)return false;

	    if (node.nodeType === 10/*Node.DOCUMENT_TYPE_NODE*/) {
	        if (this.name !== node.name ||
	            this.publicId !== node.publicId ||
	            this.systemId !== node.systemId 
	        )return false;
	    }

	    if (node.nodeType === 1/*Node.ELEMENT_NODE*/) {
	        if (this.namespaceURI != node.namespaceURI ||
	            this.prefix != node.prefix ||
	            this.localName != node.localName
	        ) {
	            return false;
	        }
	        for (i = 0, len = this.attributes.length; i < len; i++) {
	            var attr = this.attributes[length];
	            var nodeAttr = node.getAttributeNS(attr.namespaceURI, attr.localName);
	            if (nodeAttr === null || nodeAttr.value !== attr.value)
	                return false;
	        }
	    }

	    if (node.nodeType === 7/*Node.PROCESSING_INSTRUCTION_NODE*/) {
	        if (this.target !== node.target || this.data !== node.data)
	            return false;
	    }

	    if (node.nodeType === 3/*Node.TEXT_NODE*/ || node.nodeType === 8/*Node.COMMENT_NODE*/) {
	        if (this.data !== node.data)
	            return false;
	    }
	    if (node.childNodes.length !== this.childNodes.length)return false;

	    for (i = 0, len = node.childNodes.length; i < len; i++) {
	        var isEqual = node.childNodes[i].isEqualNode(this.childNodes[i]);
	        if (isEqual === false) {
	            return false;
	        }
	    }

	    return true;
	};
}
/*
http://www.alistapart.com/articles/crossbrowserscripting
*/
if(!document.importNode) {
	document.importNode = function(node, allChildren) {
		/* find the node type to import */
		switch (node.nodeType) {
			case 1://document.ELEMENT_NODE:
				var newNode = document.createElement(node.nodeName),//create a new element
					attrs = node.attributes,
					attr,
					_childNodes,
					i,
					il;
					
				/* does the node have any attributes to add? */
				if (attrs && attrs.length > 0)
					/* add all of the attributes */
					for (i = 0, il = attrs.length ; i < il ;) {
						attr = node.attributes[i++];
						newNode.setAttribute(attr.nodeName, node.getAttribute(attr.nodeName));
					}
				/* are we going after children too, and does the node have any? */
				if (allChildren && (_childNodes = node.childNodes) && _childNodes.length > 0)
					/* recursively get all of the child nodes */
					for (i = 0, il = _childNodes.length; i < il;)
						newNode.appendChild(document.importNode(_childNodes[i++], allChildren));
				return newNode;
			break;
			
			case 3://document.TEXT_NODE:
			case 4://document.CDATA_SECTION_NODE:
			case 8://document.COMMENT_NODE:
				return document.createTextNode(node.nodeValue);
			break;
		}
		_throwDOMException("NOT_SUPPORTED_ERR");
		return null;
	};
	document.importNode["shim"] = true;
}

//getElementsByClassName shim
//based on https://gist.github.com/1383091
tmp = "getElementsByClassName";
function_tmp = _Element_prototype[tmp] || 
	document.querySelectorAll ? //Here native querySelectorAll in IE8
		function(names) {
			if(!names || !(names = _String_trim.call(names)))return [];
			return (this.querySelectorAll || document.querySelectorAll).call(this, names.replace(/\s+(?=\S)|^/g, "."))
		}
		:
		function(klas) {

			klas = new RegExp(klas.replace(RE__getElementsByClassName, STRING_FOR_RE__getElementsByClassName));

			var magicTagName = arguments.callee["tagName"],//only for IE < 8 querySelector shim
				nodes = magicTagName ? 
			  		(
			  		delete arguments.callee["tagName"], 
			    	this.nodeType === 9 && magicTagName === "BODY" ? 
			    		[this.body] :
						this.getElementsByTagName(magicTagName)
					) : this.all,
				node,
				i = -1,
				result = [];

			while(node = nodes[++i]) {
				if(node.className && klas.test(node.className)) {
					result.push(node);
				}
			}

			return result;
		};
if(!(tmp in _testElement))_Element_prototype[tmp] = function_tmp;
if(!document[tmp])_document_documentElement[tmp] = document[tmp] = function_tmp;


tmp = 'compareDocumentPosition';
if(!(tmp in document)) {
	var __name,
		__n1 = __name || 'DOCUMENT_POSITION_';//Use '__name || ' only for GCC not to inline __n1 param. In this case __name MUST be undefined
	_document_documentElement[tmp] = document[tmp] = _Node_prototype[tmp] = function(b) {
		var a = this;
		
		//compareDocumentPosition from http://ejohn.org/blog/comparing-document-position/
		return a.contains ?
				(a != b && a.contains(b) && 16) +
				(a != b && b.contains(a) && 8) +
				(a.sourceIndex >= 0 && b.sourceIndex >= 0 ?
					(a.sourceIndex < b.sourceIndex && 4) +
					(a.sourceIndex > b.sourceIndex && 2) :
				1) +
			0 : 0;
	};
	__name = 'DISCONNECTED';
	_document_documentElement[__n1 + __name] = document[__n1 + __name] = _Node_prototype[__n1 + __name] = 0x01;
	__name = 'PRECEDING';
	_document_documentElement[__n1 + __name] = document[__n1 + __name] = _Node_prototype[__n1 + __name] = 0x02;
	__name = 'FOLLOWING';
	_document_documentElement[__n1 + __name] = document[__n1 + __name] = _Node_prototype[__n1 + __name] = 0x04;
	__name = 'CONTAINS';
	_document_documentElement[__n1 + __name] = document[__n1 + __name] = _Node_prototype[__n1 + __name] = 0x08;
	__name = 'CONTAINED_BY';
	_document_documentElement[__n1 + __name] = document[__n1 + __name] = _Node_prototype[__n1 + __name] = 0x10;
}

if(!global.getComputedStyle) {//IE < 9
/*
TODO::
var filter = elem.style['filter'];
    return filter ? (filter.indexOf('opacity=') >= 0 ?
      (parseFloat(filter.match(/opacity=([^)]*)/)[1] ) / 100) + '' : '1') : '';
*/
	/**
	 * @link https://developer.mozilla.org/en/DOM/window.getComputedStyle
	 * getCurrentStyle - функция возвращяет текущий стиль элемента
	 * @param {?Node} obj HTML-Элемент
	 * @param {?string} pseudoElt A string specifying the pseudo-element to match. Must be null (or not specified) for regular elements.
	 * @this {Window}
	 * @return {CSSStyleDeclaration} Стиль элемента
	 */
	global.getComputedStyle = function(obj, pseudoElt) {
		return obj.currentStyle;
	}
}


//Исправляем для IE<9 создание DocumentFragment, для того, чтобы функция работала с HTML5
if(_browser_msie < 9) {
	document.createDocumentFragment = function() {
		var df = 
				_Function_call.call(document_createDocumentFragment, this);
		
		if(global["DocumentFragment"] === global["Document"]) {
			//TODO:: if DocumentFragment is a fake DocumentFragment -> append each instance with Document methods
			_append(df, global["DocumentFragment"].prototype);//TODO: tests
		}
		
		return html5_document(df);
	};
}




/*  >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>  HTML5 shiv  ==================================  */
/*  =======================================================================================  */

supportsUnknownElements = ((_testElement.innerHTML = '<x-x></x-x>'), _testElement.childNodes.length === 1 && _testElement.childNodes[0].nodeType === 1);
	
html5_elements = "|" + html5_elements + "|";

function shivedCreateElement(nodeName) {
	var node = this["__orig__createElement__"](nodeName);

	if(ielt9_elements.test(nodeName))return node;

	if(!~html5_elements.indexOf("|" + nodeName + "|")) {
		html5_elements_array.push(nodeName);
		html5_elements += (nodeName + "|");
		(safeFragment["__orig__createElement__"] || safeFragment.createElement/* || function(){}*/)(nodeName);
		//node.document.createElement(nodeName);
	}
	
	return safeFragment.appendChild(node);
}
shivedCreateElement["ielt9"] = true;

/** Making a document HTML5 element safe
 * Функция "включает" в IE < 9 HTML5 элементы
 * @param {Document} doc
 */
function html5_document(doc) { // pass in a document as an argument
	// create an array of elements IE does not support
	var a = -1,
		_doc;

	if(doc.createElement) {
		while (++a < html5_elements_array.length) { // loop through array
			doc.createElement(html5_elements_array[a]); // pass html5 element into createElement method on document
		}
		
		if(doc.createElement !== shivedCreateElement && !("ielt9" in doc.createElement)) {
			doc["__orig__createElement__"] = doc.createElement;
			doc.createElement = shivedCreateElement;
		}
	}

	return doc; // return document, great for safeDocumentFragment = html5_document(document.createDocumentFragment());
} // critique: array could exist outside the function for improved performance?

safeFragment = html5_document(_Function_call.call(document_createDocumentFragment, document));

if(!supportsUnknownElements) {
	 html5_document(document);
	 //style
	document.head.insertAdjacentHTML("beforeend", "<br><style>" +//<br> need for all IE
		// corrects block display not defined in IE6/7/8/9
		"article,aside,figcaption,figure,footer,header,hgroup,nav,section{display:block}" +
		// adds styling not present in IE6/7/8/9
		"mark{background:#FF0;color:#000}" +
	"</style>");
}

//Test for broken 'cloneNode'
if(_Function_call.call(document_createElement, document, "x-x").cloneNode().outerHTML.indexOf("<:x-x>") === 0) {
	safeElement = safeFragment.appendChild("createElement" in safeFragment && safeFragment.createElement("div") || safeFragment.ownerDocument.createElement("div"));
	_nativeCloneNode = 
		_browser_msie === 8 ?
			_testElement["cloneNode"] :
			_browser_msie < 8 ?
				_Node_prototype["cloneNode"] : void 0;
	
	/**
	 * Issue: <HTML5_elements> become <:HTML5_elements> when element is cloneNode'd
	 * Solution: use an alternate cloneNode function, the default is broken and should not be used in IE anyway (for example: it should not clone events)
	 * В Internet Explorer'е функция <HTMLElement>.cloneNode "ломает" теги HTML5 при клонировании,
	 *  поэтому нужно использовать альтернативный способ клонирования
	 *
	 * Больше по теме: http://pastie.org/935834
	 *
	 * Альтернатива <Node>.cloneNode в IE < 9
	 * @param {boolean=} include_all [false] Клонировать ли все дочерние элементы? По-умолчанию, false
	 * @this {Node} element Элемент для клонирования
	 * @version 4
	 */
	_Node_prototype["cloneNode"] = function(include_all) {//Экспортируем cloneElement для совместимости и для вызова напрямую	
		var element = this,
			result,
			nodeBody;
		
		if(ielt9_elements.test(element.nodeName)) {//HTML4 element?
			result = _Function_call.call(element["__nativeCloneNode__"] || _nativeCloneNode, element, include_all);
		}
		else {//HTML5 element?
			safeElement.innerHTML = "";//Очистим от предыдущих элементов

			// set HTML5-safe element's innerHTML as input element's outerHTML
			if(include_all)nodeBody = element.outerHTML;
			else nodeBody = element.outerHTML.replace(element.innerHTML, "");
		
			safeElement.innerHTML = nodeBody.replace(/^\<\:/, "<").replace(/\<\/\:([\w\-]*\>)$/, "<$1");

			result = safeElement.firstChild; // return HTML5-safe element's first child, which is an outerHTML clone of the input element

			if(!result && !include_all) {//IE < 9 fail to create unknown tag
				//if(!result && include_all)->sinensy faild due can't write a solution
				nodeBody = nodeBody.match(RE_cloneElement_tagMatcher);
				if(nodeBody)nodeBody = nodeBody[1];
				if(nodeBody) {
					safeFragment.createElement(nodeBody);
					safeElement.innerHTML = nodeBody;
					result = safeElement.firstChild;
				}
			}
		}
			
		return safeFragment.appendChild(result);
	};

};


/*  >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>  HTML5 shiv  ======================================  */
/*  ======================================================================================  */


/*  =======================================================================================  */
/*  ================================  NodeList.prototype  <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<  */

//Inherit NodeList from Array
function extendNodeListPrototype(nodeListProto) {
	if(nodeListProto && nodeListProto !== Array.prototype) {
		for(var key in nodeList_methods_fromArray)if(_hasOwnProperty(key, nodeList_methods_fromArray)) {
			if(!nodeListProto[key])nodeListProto[key] = function() {
				_Function_apply.call(Array.prototype[key], Array["from"](this), arguments);
			}
		}
	}
}
if(document.querySelectorAll)extendNodeListPrototype(document.querySelectorAll("#z").constructor.prototype);
/*  >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>  NodeList.prototype  ==================================  */
/*  ======================================================================================  */


/*  ======================================================================================  */
/*  >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>  DOM  =======================================  */



_testElement = _txtTextElement = tmp = function_tmp = nodeList_methods_fromArray = supportsUnknownElements = void 0;






if(!_Node_prototype["ie"] && _browser_msie > 7)return;
/*  ======================================================================================  */
/*  ======================================================================================  */
/*  ======================================================================================  */
/*  ======================================================================================  */
/*  ======================================================================================  */
/*  ======================================================================================  */
/*  ======================================================================================  */
/*  ======================================================================================  */
/*  ======================================================================================  */
/*  ======================================================================================  */

//                                         IE lt 8

/*  ======================================================================================  */
/*  ======================================================================================  */
/*  ======================================================================================  */
/*  ======================================================================================  */
/*  ======================================================================================  */
/*  ======================================================================================  */
/*  ======================================================================================  */
/*  ======================================================================================  */
/*  ======================================================================================  */
/*  ======================================================================================  */







//CONFIG START
var /** @const*/
    __URL_TO_ELEMENT_BEHAVIOR__     = '/a.ielt8.htc'
	/** @const*/
  , __STYLE_ID                      = "ielt8_style_prev_for_behaviour"
	/** @const List of supporting tag names */
  , __SUPPORTED__TAG_NAMES__ = "*"

;
//CONFIG END

var /** @type {boolean} */
	noDocumentReadyState = !document.readyState

	/** @const */
  , ieltbehaviorRules = [__URL_TO_ELEMENT_BEHAVIOR__]
	
  , ielt9BehaviorRule = "{behavior:"

  , __ielt8__wontfix = []

  , prevCreateElement

  , origCloneNode

  , __ielt8_Node_behavior_apply

	/** @const */
  , _Element_getElementsByClassName = document.getElementsByClassName

	// ------------------------------ ==================  Window  ================== ------------------------------
  , _emulate_scrollX_scrollY
  
	/** @const */
  , originalScrollTo = global.scrollTo

	/** @const */
  , originalScrollBy = global.scrollBy

	// ------------------------------ ==================  querySelector  ================== ------------------------------
	/** @type {RegExp} @const */
  , RE__getElementsByClassName = /\s*(\S+)\s*/g
  	/** @type {String} @const */
  , STRING_FOR_RE__getElementsByClassName = '(?=(^|.*\\s)$1(\\s|$))'
  	/** @type {RegExp} @const */
  , RE__selector__easySelector = /^(\w+)?((?:\.(?:[\w\-]+))+)?$|^#([\w\-]+$)/
  	/** @type {RegExp} @const */
  , RE__queryManySelector__doubleSpaces = /\s*([,>+~ ])\s*/g//Note: Use with "$1"
  	/** @type {RegExp} @const */
  , RE__querySelector__arrtSpaceSeparated_toSafe = /\~\=/g
  	/** @type {RegExp} @const */
  , RE__querySelector__arrtSpaceSeparated_fromSafe = /\|\-\|/g
  	/** @type {RegExp} @const */
  , RE__queryManySelector__selectorsMatcher = /(^[+> ~]?|,|\>|\+|~| ).*?(?=[,>+~ ]|$)/g
  	/** @type {RegExp} @const */
  , RE__querySelector__dottes = /\./g
  	/** @type {RegExp} @const */
  , RE__queryOneSelector__spaces = /\s/g
  	/** @type {RegExp} @const */
  , RE__queryOneSelector__attrMatcher = /^\[?(.*?)(?:([\*~&\^\$\|!]?=)(.*?))?\]?$/
  	/** @type {RegExp} @const */
  , RE__queryOneSelector__selectorMatch = /^([,>+~ ])?(\w*)(?:|\*)\#?([\w\-]*)((?:\.?[\w\-])*)(.*?)$/

  , RE__queryOneSelector__selectorMatch2 = /^(\[.+\])?(?:\:(.+))?$/
  	/** @type {RegExp} @const */
  , RE__queryOneSelector__pseudoMatcher = /^([^(]+)(?:\(([^)]+)\))?$//* regexpt from jass 0.3.9 (http://yass.webo.in/) rev. 371 line 166 from right */
  	/** @type {RegExp} @const */
  , RE__queryOneSelector__pseudoNthChildPlus = /\((\dn)\+(\d)\)/
  	/** @type {RegExp} @const */
  , RE__queryOneSelector__pseudoNthChildMatcher = /(?:([-]?\d*)n)?(?:(%|-)(\d*))?//* regexpt from jass 0.3.9 (http://yass.webo.in/) rev. 371 line 181 ( mod === 'nth-last-child' ?...) */

  , RE_matchSelector__isSimpleSelector = /([,>+~ ])/

;


tmp = ieltbehaviorRules.length;
while(--tmp >= 0)
	ielt9BehaviorRule += (" url(\"" + ieltbehaviorRules[tmp] + "\")");
ielt9BehaviorRule += "}";

function createBehaviorStyle(styleId, tags, behaviorRule) {
	var style = document.getElementById(styleId),
		add = "";

	if(style){
		add = style.getAttribute("data-url") || "";
		style.id = "";
	}

	if(add) {
		behaviorRule.replace(" url(", " url(" + add + ") url(");
	}

	style = document_createElement("style");
	style.id = styleId;
	style.type = 'text/css';
	style.setAttribute("data-url", behaviorRule.replace("{behavior:", "").replace(")}", ")"));
	style.styleSheet.cssText = tags + behaviorRule;
	document.head.appendChild(style);
}

if(noDocumentReadyState)document.readyState = "uninitialized";


_Node_prototype["ielt8"] = true;

global["__ielt8__wontfix"] = __ielt8__wontfix;


/**
 * @param {(string|undefined)} classes
 * @param {(string|undefined)=} tag
 * @param {Object=} resultKeys
 * @param {Array=} resultArray
 * @param {boolean=} onlyOne
 * @this {Node}
 * @return {Array.<HTMLElement>}
 */
function getElementsBy_ClassName_Tag(classes, tag, resultKeys, resultArray, onlyOne) {
	var el = this,
		result,
		nodes,
		node,
		i = -1;

	if(tag)tag = tag.toUpperCase();

	if(classes) {
		classes = classes.replace(RE__querySelector__dottes, " ");
		
		_shim_getElementsByClassName["tagName"] = tag;
		nodes = _shim_getElementsByClassName.call(el, classes)
		tag = void 0;
	}
	else {
		if(el.nodeType === 9 && tag === "BODY")nodes = [el.body];
		else nodes = el.getElementsByTagName(tag || "*");
			
		tag = void 0;
	}

	if(!tag && !resultKeys && !resultArray)return nodes;

	result = resultArray || [];

	while(node = nodes[++i]) {
		if((!tag || node.tagName === tag) && (!resultKeys || !((node.sourceIndex || (node.sourceIndex = ++UUID)) in resultKeys))) {
			resultKeys && (resultKeys[node.sourceIndex] = true);
			result.push(node);

			if(onlyOne)return result;
		}
	}
		
	return result;
}


/**
 * @param {!string} selector CSS3-selector
 * @param {Node|Array.<Node>} roots
 * @param {Array.<HTMLElement>=} checkeElements Pre-results
 * @param {boolean=} onlyOne only one need
 * @param {(Object|boolean)=} resultKeys
 * @return {Array.<HTMLElement>}
 */
function queryOneSelector(selector, roots, checkeElements, onlyOne, resultKeys) {
	var /** @type {Node} */root = !roots ? document : 
		"length" in roots ? //fast and unsafe isArray
			roots[0] :
			roots
	;
	if(root === roots)roots = [];
	
	var /** @type {boolean} */isCheckeElements = !!checkeElements,
		/** @type {Array.<string>} */selectorArr = selector.match(RE__queryOneSelector__selectorMatch);

	if(selector === "," || !selectorArr)_throwDOMException("SYNTAX_ERR");

	//Cache object for nore unique id (sourceIndex) for non-dublication
	//resultKeys = resultKeys || {};

	var 
		result = checkeElements || [],
		/** @type {Object} */rootKeys = {},
		/** @type {Node} */child,

		/** @type {(string|undefined)} */combinator = selectorArr[1],
		/** @type {(string|undefined)} */tag = selectorArr[2].toUpperCase(),
		/** @type {(string|undefined)} */id = selectorArr[3],
		/** @type {(string|Array.<string>|undefined)} */classes = selectorArr[4],
		/** @type {(string|Array.<string>)} */css3AttrAndcss3Pseudo,
		/** @type {string} */_curClass,
		/** @type {number} */kr = -1,
		/** @type {number} */k,

		/** @type {Node} */brother,

		/** @type {number} */i = 0,
		/** @type {boolean} */match = false,
		klas;
	
	if(classes) {
		selectorArr[4] = classes.replace(RE__querySelector__dottes, " ");
		klas = new RegExp(selectorArr[4].replace(RE__getElementsByClassName, STRING_FOR_RE__getElementsByClassName));
		classes = _String_split.call(classes.slice(1), RE__querySelector__dottes);
	}
	
	//if(css3Pseudo === ":root")isCheckeElements = true, result = [~roots.indexOf(document) ? _document_documentElement : null];//TODO:: tests

	if(!isCheckeElements) {// ! matchesSelector
		
		switch(combinator) {
			default://combinator == ' ' || combinator == ','
				if(id) {
					do {
						if((root.sourceIndex || (root.sourceIndex = ++UUID)) in rootKeys)continue;
						rootKeys[root.sourceIndex] = true;

						match = "getElementById" in root;
						if(match && (child = root.getElementById(id)) || ((child = document.getElementById(id)) && (match = root.contains(child))))result.push(child);
					}
					while(!match && (root = roots[++i]));
				}
				else {
					do {
						if((root.sourceIndex || (root.sourceIndex = ++UUID)) in rootKeys)continue;
						
						rootKeys[root.sourceIndex] = true;
						
						
						/*if(combinator === " ") {
							a = root.compareDocumentPosition
						}*/

						getElementsBy_ClassName_Tag.call(root, selectorArr[4], tag, resultKeys, result, onlyOne);
					}
					while(root = roots[++i]);
				}
				if(id) {
					id = void 0;
				}
				else {
					tag = classes = void 0;
				}
			break;
			case '+':
				do {
					if((root.sourceIndex || (root.sourceIndex = ++UUID)) in rootKeys)continue;
					rootKeys[root.sourceIndex] = true;
					while((root = root.nextSibling) && root.nodeType != 1){}

					match = root && (root.sourceIndex || (root.sourceIndex = ++UUID)) && (!tag || root.tagName.toUpperCase() === tag) &&
						(!resultKeys || !(root.sourceIndex in resultKeys));
						
					if(match && classes) {
						match = root.className && klas.test(root.className);
					}
					if(match) {
						result.push(root);

						if(resultKeys)resultKeys[root.sourceIndex] = true;
					}
				}
				while(root = roots[++i]);
				classes = tag = void 0;
			break;
			case '~'://W3C: "an F element preceded by an E element"
				do {
					if((root.sourceIndex || (root.sourceIndex = ++UUID)) in rootKeys)continue;
					rootKeys[root.sourceIndex] = true;

					child = roots[i + 1];//next root

					while (root = root.nextSibling) {
						if(root === child)break;

						match = root.nodeType == 1 && (root.sourceIndex || (root.sourceIndex = ++UUID)) && (!tag || root.tagName.toUpperCase() === tag) &&
							(!resultKeys || !(root.sourceIndex in resultKeys));
							
						if(match && classes) {
							match = root.className && klas.test(root.className);
						}
						if(match) {
							result.push(root);

							if(resultKeys)resultKeys[root.sourceIndex] = true;
						}
					}
				}
				while(root = roots[++i]);
				classes = tag = void 0;
			break;
			case '>'://W3C: "an F element preceded by an E element"
				do {
					if((root.sourceIndex || (root.sourceIndex = ++UUID)) in rootKeys)continue;
					rootKeys[root.sourceIndex] = true;
					k = -1;
					while(child = root.childNodes[++k]) {
						match = child.nodeType == 1 && (child.sourceIndex || (child.sourceIndex = ++UUID)) && (!tag || child.tagName.toUpperCase() === tag) &&
							(!resultKeys || !(child.sourceIndex in resultKeys));
							
						if(match && classes) {
							match = child.className && klas.test(child.className);
						}
						if(match) {
							result.push(child);

							if(resultKeys)resultKeys[child.sourceIndex] = true;
						}
					}
				}
				while(root = roots[++i]);
				classes = tag = void 0;
			break;
		}
		
		
		combinator = void 0;
	
	}

	if(result.length && (tag || classes || (css3AttrAndcss3Pseudo = selectorArr[5]) || id)) {
		css3AttrAndcss3Pseudo = css3AttrAndcss3Pseudo && css3AttrAndcss3Pseudo.match(RE__queryOneSelector__selectorMatch2) || [];
		return checkNodeAttributes(result, tag , classes , css3AttrAndcss3Pseudo[1] , css3AttrAndcss3Pseudo[2] , id, onlyOne)
	}
	else 
		return result;
}

function checkNodeAttributes(result, tag , classes , css3Attr , css3Pseudo , id, onlyOne) {
	
		var 
		/** @type {Node} */child,
		/** @type {number} */kr,
		/** @type {string} */_curClass,
		/** @type {(Array.<number>)} */ind,
		/** @type {number} */a,
		/** @type {string} */b,
		/** @type {number} */c,
		/** @type {Node} */brother,

		/** @type {number} */i = -1,
		/** @type {boolean} */match = false,
		/** @type {boolean} */isLast,
		/** @type {Array.<string>} */css3Attr_add,
		/** @type {Array.<string>} */css3Pseudo_add,

		/** @type {string} */nodeAttrCurrent_value,
		/** @type {string} */nodeAttrExpected_value;

		//if(classes)classes = _String_split.call(classes.slice(1), RE__queryOneSelector__spaces);

		while(child = result[++i]) {
			match = !(id && child.id != id);
			c = child.tagName.toUpperCase();
			
			if(match && classes) {
				kr = -1;
				_curClass = ' ' + child.className + ' ';
				while(classes[++kr] && match)
					match = !!~_curClass.indexOf(classes[kr]);
			}
			if(match && tag) {
				match = c === tag;
			}
			if(match && css3Attr) {
				kr = -1;
				
				if(typeof css3Attr == 'string') {//Check, if we not analys css3Attr yet
					css3Attr = _String_split.call(css3Attr, "][");
					while(css3Attr_add = css3Attr[++kr]) {
						css3Attr_add = css3Attr[kr] = css3Attr_add.replace(RE__querySelector__arrtSpaceSeparated_fromSafe, "~=").match(RE__queryOneSelector__attrMatcher);
						
						b = css3Attr_add[1];
						if((a = b.charAt(0)) === "\'" || a === "\""	&& b.substr(-1) === a) {//Note: original IE substr not allowed negative value as first param
							b = css3Attr_add[1] = _String_substr.call(b, 1, b.length - 2);
						}
						/*if("all" in document) {//IE
							if(b == "class")css3Attr_add[1] = "className";
							else if(b == "for")css3Attr_add[1] = "htmlFor";
						}*/
						b = css3Attr_add[3];
						if(b && ((a = b.charAt(0)) === "\'" || a === "\""	&& b.substr(-1) === a)) {
							b = css3Attr_add[3] = _String_substr.call(b, 1, b.length - 2);
						}
					}
					kr = -1;
				}

				while(match && (css3Attr_add = css3Attr[++kr])) {
					var a123 = child.attributes[css3Attr_add[1]];
					if(a123 === void 0 && css3Attr_add[2] !== '!=') {
						match = false;
						continue;
					}
					
					nodeAttrCurrent_value = a123.specified && a123.value;//child.getAttribute(css3Attr_add[1]);
					if(c/*child.tagName*/ === "A" && nodeAttrCurrent_value && css3Attr_add[1] === "href") {
						nodeAttrCurrent_value = nodeAttrCurrent_value.replace(location.protocol + "//" + location.host + location.pathname, "");
					}
					nodeAttrExpected_value = css3Attr_add[3];
					
					// TODO: Проверить, что все опреации ^=, !=, *= и т.д. работают или ввести nodeAttrCurrent_value = child.getattribute(); if(nodeAttrCurrent_value)nodeAttrCurrent_value = nodeAttrCurrent_value + ''
					/* from yass 0.3.9 http://yass.webo.in/
						 and edited by me :) */
					/* function calls for CSS2/3 attributes selectors */
					switch(css3Attr_add[2]) {
					/* W3C "an E element with a "nodeAttrCurrent_value" attribute" */
						default://css3Attr[2] == ''
							match = !!nodeAttrCurrent_value || nodeAttrCurrent_value === "";
						break;
					/*
					W3C "an E element whose "nodeAttrCurrent_value" attribute nodeAttrExpected_value is
					exactly equal to "nodeAttrExpected_value"
					*/
						case '=':
							match = nodeAttrCurrent_value && nodeAttrCurrent_value === nodeAttrExpected_value;
						break;
					/*
					from w3.prg "an E element whose "nodeAttrCurrent_value" attribute nodeAttrExpected_value is
					a list of space-separated nodeAttrExpected_value's, one of which is exactly
					equal to "nodeAttrExpected_value"
					*/
						case '&=':
							match = nodeAttrCurrent_value && (new RegExp('(^| +)' + nodeAttrExpected_value + '($| +)').test(nodeAttrCurrent_value));
						break;
					/*
					from w3.prg "an E element whose "nodeAttrCurrent_value" attribute nodeAttrExpected_value
					begins exactly with the string "nodeAttrExpected_value"
					*/
						case '^=':
							match = nodeAttrCurrent_value && !nodeAttrCurrent_value.indexOf(nodeAttrExpected_value);
						break;
					/*
					W3C "an E element whose "nodeAttrCurrent_value" attribute nodeAttrExpected_value
					ends exactly with the string "nodeAttrExpected_value"
					*/
						case '$=':
							match = (nodeAttrCurrent_value && nodeAttrCurrent_value.indexOf(nodeAttrExpected_value) == nodeAttrCurrent_value.length - nodeAttrExpected_value.length);
						break;
					/*
					W3C "an E element whose "nodeAttrCurrent_value" attribute nodeAttrExpected_value
					contains the substring "nodeAttrExpected_value"
					*/
						case '*=':
							match = (nodeAttrCurrent_value && ~nodeAttrCurrent_value.indexOf(nodeAttrExpected_value));
						break;
					/*
					W3C "an E element whose "nodeAttrCurrent_value" attribute has
					a hyphen-separated list of nodeAttrExpected_value's beginning (from the
					left) with "nodeAttrExpected_value"
					*/
						case '|=':
							match = (nodeAttrCurrent_value && (nodeAttrCurrent_value === nodeAttrExpected_value || !!~nodeAttrCurrent_value.indexOf(nodeAttrExpected_value + '-')));
						break;
					/* nodeAttrCurrent_value doesn't contain given nodeAttrExpected_value */
						case '!=':
							match = (!nodeAttrCurrent_value || !(new RegExp('(^| +)' + nodeAttrExpected_value + '($| +)').test(nodeAttrCurrent_value)));
						break;

						case '~=':
							match = nodeAttrCurrent_value && !!~(" " + nodeAttrCurrent_value.replace(RE__queryOneSelector__spaces, " ") + " ").indexOf(" " + nodeAttrExpected_value + " ");
						break;
					}
				}
			}
			if(match && css3Pseudo) {
				//In this block we lose "child" value
				if(typeof css3Pseudo == 'string') {
					css3Pseudo = css3Pseudo.match(RE__queryOneSelector__pseudoMatcher);
					//TODO:: Не работает nth-child и nth-last-child - путаница с nodeIndex
					if(css3Pseudo[1].substr(0, 3) == 'nth' && css3Pseudo[2]) {
						if(!/\D/.test(css3Pseudo[2]))css3Pseudo_add = [null, 0, '%', css3Pseudo[2]];
						else if(css3Pseudo[2] === 'even')css3Pseudo_add = [null, 2];
						else if(css3Pseudo[2] === 'odd')css3Pseudo_add = [null, 2, '%', 1];
						else css3Pseudo_add = css3Pseudo[2].match(RE__queryOneSelector__pseudoNthChildMatcher);
					}
				}
				//TODO:: Не работает nth-child и nth-last-child - путаница с nodeIndex
				/* from yass 0.3.9 http://yass.webo.in/ */
				/*
				function calls for CSS2/3 modificatos. Specification taken from
				http://www.w3.org/TR/2005/WD-css3-selectors-20051215/
				on success return negative result.
				*/
				switch(css3Pseudo[1]) {
				/* W3C: "an E element, only child of its parent" */
					case 'only-child':
				/* W3C: "an E element, first rs of its parent" */

					case 'first-child':
				/* implementation was taken from jQuery.1.7 */
						brother = child;
						while ((brother = brother.previousSibling) && brother.nodeType != 1) {}
				/* Check for node's existence */
						match = !brother;

						if(!match || css3Pseudo[1] == 'first-child')break;

				/* W3C: "an E element, last rs of its parent" */
					case 'last-child'://In this block we lose "rs" value
						brother = child;
				/* loop in lastrss while nodeType isn't element */
						while ((brother = brother.nextSibling) && brother.nodeType != 1) {}
				/* Check for node's existence */
						match = !brother;
					break;

				/* W3C: "an E element, root of the document" */
					case 'root':
						match = c/*child.tagName*/ == "HTML";
					break;

				/* W3C: "an E element, the n-th child of its parent" */
				case 'nth-child':
				/* W3C: "an E element, the n-th rs of its parent, counting from the last one" */
				case 'nth-last-child':
						if(!css3Pseudo_add[1] && !css3Pseudo_add[3])break;

						//In this moment "match" MUST be true
						isLast = css3Pseudo[1] != 'nth-child';
						c = child[isLast ? "nodeIndexLast" : "nodeIndex"] || 0,
						a = css3Pseudo_add[3] ? (css3Pseudo_add[2] === '%' ? -1 : 1) * css3Pseudo_add[3] : 0,
						b = css3Pseudo_add[1];
						if (c) {//check if we have already looked into siblings, using exando - very bad
							match = !b ? !(c + a) : !((c + a) % b);
						}
						else {//in the other case just reverse logic for n and loop siblings
							match = false;
							brother = child.parentNode[isLast ? "lastChild" : "firstChild"];
							//c++;
							do {//looping in rs to find if nth expression is correct
								//nodeIndex expando used from Peppy / Sizzle/ jQuery
								if (brother.nodeType == 1 &&
									(brother[isLast ? "nodeIndexLast" : "nodeIndex"] = ++c) &&
									child === brother &&
									(!b ? !(c + a) : !((c + a) % b))) {
									match = true;
								}
							} while (!match && (brother = brother[isLast ? "previousSibling" : "nextSibling"]));
						}
					break;
					
				/*
				Rrom w3.org: "an E element that has no rsren (including text nodes)".
				Thx to John, from Sizzle, 2008-12-05, line 416
				*/
					case 'empty':
						match = !child.firstChild;
					break;
				/*
				W3C: "a user interface element E which is checked
				(for instance a radio-button or checkbox)"
				*/
					case 'checked':
						match = !!child.checked;
					break;
				/*
				W3C: "an element of type E in language "fr"
				(the document language specifies how language is determined)"
				*/
					case 'lang':
						match = (child.lang == css3Pseudo_add || _document_documentElement.lang == css3Pseudo_add);
					break;
				/* thx to John, from Sizzle, 2008-12-05, line 398 */
					case 'enabled':
						match = !child.disabled && child.type !== 'hidden';
					break;
				/* thx to John, from Sizzle, 2008-12-05, line 401 */
					case 'disabled':
						match = !!child.disabled;
					break;
				/* thx to John, from Sizzle, 2008-12-05, line 407 */
					case 'selected':
				/*
				Accessing this property makes selected-by-default
				options in Safari work properly.
				*/
						//TODO: Проверить новый алгоритм
						//Старый: child.parentNode.selectedIndex;//NOTE:: Add this string manual to compile by Closure Compiler script/Добавить это строчку в откомпилированый скрипт
						//				match = !!child.selected;
						match = child.parentNode.selectedIndex && !!child.selected;//Тут уже Closure Compiler не удаляет нужный вызов
					break;

					case 'contains':
						match = !!~(child.textContent || child.data || child.innerText).indexOf(css3Pseudo[2]);
					break;

					case 'not':
						match = queryOneSelector(css3Pseudo[2], null, [child], true).length === 0;
					break;
					/*TODO::
					default:
						//Non-standart pseudo-classes
						var f = $$N.nonStandartPseudoClasses[css3Pseudo[1]];
						if(f)match = f(child);*/
				}
				
			}
		
			if(!match)_Array_splice.call(result, i--, 1);
			else if(onlyOne) {
				result = null;
				return [child];
			}
		}
	
	return result;
};



/**
 * @param {!string} selector Строка с CSS3-selector
 * @param {boolean=} onlyOne only one need
 * @this {Document|HTMLElement|Node} root
 * @return {Array.<HTMLElement>}
 * @version 4.0
 */
var queryManySelector = function queryManySelector(selector, onlyOne) {
	//var rules = selector.replace(/ *([,>+~. ]) */g, "$1").match(/[^,]\w*/g),

	var root = this,
		rt,
		rules;

	selector = _String_trim.call(selector.replace(RE__queryManySelector__doubleSpaces, "$1"));

	if(rules = selector.match(RE__selector__easySelector)) {//quick result
		if(rules[3]) {
			selector = selector.slice(1);
			rt = root.getElementById ? root.getElementById(selector) : document.getElementById(selector);
			//workaround with IE bug about returning element by name not by ID.
			//Solution completely changed, thx to deerua.
			//Get all matching elements with this id
			if (rt && _browser_msie < 9 && rt.id !== selector) {
				rt = root.ownerDocument.all[selector];
			}
			return rt && [rt] || [];
		}
		else {
		 return getElementsBy_ClassName_Tag.call(root, rules[2], rules[1]);
		}
	}

	var result = [],
		rule,
		i = -1,
		selElements = root,
		hightRoot = root,
		k,
		resultKeys,
		nextRule,
		lastRule,
		firstRule = true;
			
	rules = (selector + ",")
		.replace(RE__querySelector__arrtSpaceSeparated_toSafe, "|-|")
		.replace(RE__queryOneSelector__pseudoNthChildPlus, "\($1%$2\)")
		.match(RE__queryManySelector__selectorsMatcher);

	while((rule = rules[++i])) {
		/*if(lastRule) {
			lastRule = false;
			continue;
		}*/

		nextRule = rules[i + 1];
		lastRule = !nextRule || nextRule.charAt(0) === ',';

		
		if(selElements && (!(root = selElements) || selElements.length === 0)) {//No result in previous rule -> Nothing to do
			selElements = null;
		}
		else if(firstRule && rule === ":root") {
			selElements = [_document_documentElement];
		}
		else if(rule !== ",") {//CSS3 selector
			selElements = queryOneSelector(rule, root, null, onlyOne && lastRule, resultKeys || !firstRule && root.length > 1 && {});
		}


		//If last rule in this selector
		if(firstRule = lastRule) {
			if(selElements) {//Save result
			
				if(onlyOne && selElements.length)return selElements;

				if(nextRule && nextRule.length > 1)resultKeys = {};

				result = result.concat(selElements);
			}

			selElements = null;
			root = hightRoot;
		}
		
	}
	
	return result;
};


/**
 * @param {!string} selector
 * @this {Document|HTMLElement|Node}
 * @return {HTMLElement|Node}
 */
function queryOneManySelector(selector) {
	return queryManySelector.call(this, selector, true)[0] || null;
}

/**
 * @param {!string} selector
 * @this {HTMLElement}
 * @return {boolean}
 */
function _matchesSelector(selector) {
	if(!selector)return false;
	if(selector === "*")return true;
	if(selector === ":root" && this === _document_documentElement)return true;
	if(selector === "body" && this === document.body)return true;

	selector = _String_trim.call(selector.replace(RE__queryManySelector__doubleSpaces, "$1"));

	var thisObj = this,
		isSimpleSelector,
		tmp,
		match = false,
		i,
		str;

	selector = _String_trim.call(selector);

	if(isSimpleSelector = selector.match(RE__selector__easySelector)) {
		switch (selector.charAt(0)) {
			case '#':
				return thisObj.id === selector.slice(1);
			break;
			default:
				match = !(tmp = isSimpleSelector[2]) || thisObj.className && (new RegExp(tmp.replace(RE__querySelector__dottes, " ").replace(RE__getElementsByClassName, STRING_FOR_RE__getElementsByClassName))).test(thisObj.className);
				return match && !(tmp = isSimpleSelector[1]) || (thisObj.tagName && thisObj.tagName.toUpperCase() === tmp.toUpperCase());
			break;
		}
	}
	else if(!RE_matchSelector__isSimpleSelector.test(selector)) {//easy selector
		tmp = queryOneSelector(selector, null, [thisObj]);
		
		return tmp[0] === thisObj;
	}
	else {
		tmp = queryManySelector.call(thisObj.ownerDocument, selector);

		for ( i in tmp ) if(Object.prototype.hasOwnProperty.call(tmp, i)) {
					match = tmp[i] === thisObj;
					if(match)return true;
			}
			return false;
	}
}
if(!document.querySelectorAll)document.querySelectorAll = queryManySelector;
if(!document.querySelector)document.querySelector = queryOneManySelector;
if(!_document_documentElement.matchesSelector)_document_documentElement.matchesSelector = _matchesSelector;

if(!_Node_prototype.hasAttribute)_Node_prototype.hasAttribute = function(name) {
	return this.getAttribute(name) !== null;
};

var _returnFirstParam = function(a) {
	return function() {
		return a
	}
};
_Node_prototype.g1 = _returnFirstParam(1);
_Node_prototype.g2 = _returnFirstParam(2);
_Node_prototype.g3 = _returnFirstParam(3);
_Node_prototype.g4 = _returnFirstParam(4);
//_Node_prototype.g5 = _returnFirstParam(5);// historical
//_Node_prototype.g6 = _returnFirstParam(6);// historical
_Node_prototype.g7 = _returnFirstParam(7);
_Node_prototype.g8 = _returnFirstParam(8);
_Node_prototype.g9 = _returnFirstParam(9);
_Node_prototype.g10 = _returnFirstParam(10);
_Node_prototype.g11 = _returnFirstParam(11);
//_Node_prototype.g12 = _returnFirstParam(12);// historical
_Node_prototype.g16 = _returnFirstParam(16);

_Node_prototype["__ielt8__element_init__"] = function __ielt8__element_init__() {
	var thisObj = this;
	if(thisObj["element"])thisObj = thisObj["element"];//¬_¬ only if the save `this` to local variable
	
	if(!thisObj["after"])thisObj["after"] = _Element_prototype["after"];
	if(!thisObj["before"])thisObj["before"] = _Element_prototype["before"];
	if(!thisObj["append"])thisObj["append"] = _Element_prototype["append"];
	if(!thisObj["prepend"])thisObj["prepend"] = _Element_prototype["prepend"];
	if(!thisObj["replace"])thisObj["replace"] = _Element_prototype["replace"];
	if(!thisObj["remove"])thisObj["remove"] = _Element_prototype["remove"];

	if(!thisObj.isEqualNode)thisObj.isEqualNode = _Node_prototype.isEqualNode;
	if(!thisObj.compareDocumentPosition)thisObj.compareDocumentPosition = _Node_prototype.compareDocumentPosition;
	if(!thisObj.getElementsByClassName)thisObj.getElementsByClassName = _Element_prototype.getElementsByClassName;
	/*@requared: window.addEventListener, window.removeEventListener, window.dispatchEvent */
	if(!thisObj.addEventListener)thisObj.addEventListener = window.addEventListener;
	if(!thisObj.removeEventListener)thisObj.removeEventListener = window.removeEventListener;
	if(!thisObj.dispatchEvent)thisObj.dispatchEvent = window.dispatchEvent;


	if(!thisObj.querySelectorAll)thisObj.querySelectorAll = queryManySelector;
	if(!thisObj.querySelector)thisObj.querySelector = queryOneManySelector;
	if(!thisObj.matchesSelector)thisObj.matchesSelector = _matchesSelector;
	
	if(!thisObj.hasAttribute)thisObj.hasAttribute = _Element_prototype.hasAttribute;

	//Unsafe (with "OBJECT" tag, for example) set's
	try {
		if(thisObj.cloneNode !== _Node_prototype.cloneNode) {
			thisObj["__nativeCloneNode__"] = thisObj.cloneNode;
			thisObj.cloneNode = _Node_prototype.cloneNode;
		}
		if(_Node_prototype.contains)thisObj.contains = _Node_prototype.contains;
	}
	catch(e) {
		//console.error(e.message)
	}
	if(thisObj.cloneNode !== _Node_prototype.cloneNode)__ielt8__wontfix.push(thisObj);
}
//__ielt8__element_init__["plugins"] = [];



__ielt8_Node_behavior_apply = _Node_prototype["__ielt8_Node_behavior_apply"] = function (el) {
	tmp = ieltbehaviorRules.length;

	while(--tmp >= 0) try {
		el.addBehavior(ieltbehaviorRules[tmp]);
	}
	catch(e) {}
}

//If we already oweride cloneNode -> safe it
origCloneNode = _Node_prototype["cloneNode"];
_Node_prototype["cloneNode"] = function(deep) {
	var el = _Function_call.call(origCloneNode || this["__nativeCloneNode__"], this, deep);
	
	__ielt8_Node_behavior_apply(el);
	
	return el;
}

/*  ======================================================================================  */
/*  ================================  Document  <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<  */

prevCreateElement = document.createElement;
document.createElement = function(tagName) {

	var el = _Function_call.call(prevCreateElement, document, tagName);
	
	tmp = ieltbehaviorRules.length;
	while(--tmp >= 0) try {
		el.addBehavior(ieltbehaviorRules[tmp])
	}
	catch(e) {}
	
	return el;
};


/*  >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>  Document  ==================================  */
/*  ======================================================================================  */

/*  =======================================================================================  */
/*  ======================================  Network  <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<  */

if(!global.XMLHttpRequest)global.XMLHttpRequest = function() {
	//TODO:: full XMLHttpRequest shim
	return ActiveXObject("Microsoft.XMLHTTP");
}

/*  >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>  Network  ======================================  */
/*  =======================================================================================  */


/*  ======================================================================================  */
/*  ======================================  Window  <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<  */


if(!("pageXOffset" in global) && global.attachEvent) {
	global.pageXOffset = global.pageYOffset = 0;
	_emulate_scrollX_scrollY = document.compatMode === "CSS1Compat" ?
			function() { global.scrollX = global.pageXOffset = document.body.parentNode.scrollLeft; global.scrollY = global.pageYOffset = document.body.parentNode.scrollTop }
			:
			function() { global.scrollX = global.pageXOffset = document.body.scrollLeft; global.scrollY = global.pageYOffset = document.body.scrollTop };

	global.attachEvent("onscroll", _emulate_scrollX_scrollY);
	
	global.scroll = global.scrollTo = function(x, y) {
		originalScrollTo(x, y);
		_emulate_scrollX_scrollY();
	}
	global.scrollBy = function(x, y) {
		originalScrollBy(x, y);
		_emulate_scrollX_scrollY();
	}
}

/*  >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>  Window  ======================================  */
/*  ======================================================================================  */




function _DOMContentLoaded() {
	document.removeEventListener('DOMContentLoaded', _DOMContentLoaded, false);

	if(noDocumentReadyState)document.readyState = "interactive";
	
	if(_emulate_scrollX_scrollY)_emulate_scrollX_scrollY();

	if("classList" in document.body.firstChild) {
		//TODO:: no htc available do for(var node in document.all) __ielt8__element_init__(node)
	}
}
function _onload() {
	global.detachEvent('onload', _onload);

	if(noDocumentReadyState)document.readyState = "complete";

	if(_emulate_scrollX_scrollY)_emulate_scrollX_scrollY();
}

document.addEventListener('DOMContentLoaded', _DOMContentLoaded, false);//Emulated method
global.attachEvent('onload', _onload);//Native method





createBehaviorStyle(__STYLE_ID, __SUPPORTED__TAG_NAMES__, ielt9BehaviorRule);


noDocumentReadyState = ielt9BehaviorRule = tmp = void 0;


})(window);