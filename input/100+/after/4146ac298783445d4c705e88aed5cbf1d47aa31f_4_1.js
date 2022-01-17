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
		if(!event.button && fixEvent._clickButton !== void 0)_button = fixEvent._clickButton;
	}

	_append(event, _Event_prototype);

	if(!event["defaultPrevented"])event["defaultPrevented"] = false;

	"target" in event || (event.target = event.srcElement || document);// добавить target для IE
	/*
	if ( event.target && event.target.nodeType in {3 : void 0, 4 : void 0} ) {
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
	if("clientX" in event && event.pageX == null) {
		/*event.pageX = event.clientX + (_document_documentElement.scrollLeft || body && body.scrollLeft || 0) - (_document_documentElement.clientLeft || 0);
		event.pageY = event.clientY + (_document_documentElement.scrollTop || body && body.scrollTop || 0) - (_document_documentElement.clientTop || 0);*/
		//Новая вервия нуждающаяся в проверки
		event.pageX = event.clientX + _getScrollX() - (_document_documentElement.clientLeft || 0);
		event.pageY = event.clientY + _getScrollY() - (_document_documentElement.clientTop || 0);
	}

	//Add 'which' for click: 1 == left; 2 == middle; 3 == right
	//Unfortunately the event.button property is not set for click events. It is however set for mouseup/down/move ... but not click | http://bugs.jquery.com/ticket/4164 <- It is fixing now
	if(!event.which && _button)event.which = _button & 1 ? 1 : _button & 2 ? 3 : _button & 4 ? 2 : 0;

	"timeStamp" in event || (event.timeStamp = +new _Native_Date());
	
	"eventPhase" in event || (event.eventPhase = (event.target == thisObj) ? 2 : 3); // "AT_TARGET" = 2, "BUBBLING_PHASE" = 3
	
	"currentTarget" in event || (event.currentTarget = thisObj);
		
		
	// событие DOMAttrModified
	//  TODO:: недоделано
	// TODO:: Привести event во всех случаях (для всех браузеров) в одинаковый вид с newValue, prevValue, propName и т.д.
	if(!event.attrName && event.propertyName)event.attrName = _String_split.call(event.propertyName, '.')[0];//IE При изменении style.width в propertyName передаст именно style.width, а не style, как нам надо

	return event;
}