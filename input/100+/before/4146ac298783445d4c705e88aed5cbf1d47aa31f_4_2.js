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