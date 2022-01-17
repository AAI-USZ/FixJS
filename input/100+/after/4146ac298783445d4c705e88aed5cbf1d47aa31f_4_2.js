function commonHandle(nativeEvent) {
	if(fixEvent === void 0) {//фильтруем редко возникающую ошибку, когда событие отрабатывает после unload'а страницы. 
		return;
	}

	var thisObj = this,
		_,
		errors,
		errorsMessages,
		_event,
		handlersKey;


	if(    UNSTABLE_FUNCTIONS    && !_event_globalIsCaptureIndicator && nativeEvent.bubbles !== false && nativeEvent.type in _event_needCapturing && thisObj != global) {
		_event_captureHandlerNodes.push(this);
		_event = nativeEvent;
	}
	else {
		_ = thisObj["_"];
		errors = [];
		errorsMessages = [];
		handlersKey = _event_eventsUUID + (_event_globalIsCaptureIndicator ? "-" : "");
		
		if((!_ || !_[handlersKey])) {
			if(!("__dom0__" in nativeEvent))return;
			else {
				_ || (_ = {});
				_[handlersKey] || (_[handlersKey] = {});
			}
		}
		
		// получить объект события и проверить, подготавливали мы его для IE или нет
		nativeEvent || (nativeEvent = window.event);
		if(!("__isFixed" in nativeEvent))nativeEvent = fixEvent.call(thisObj, nativeEvent);
		else {
			nativeEvent.currentTarget = thisObj;
		}

		// save event properties in fake 'event' object to allow store 'event' and use it in future
		if(!("__custom_event" in nativeEvent))(_event = _safeExtend(new Event(nativeEvent.type), nativeEvent))["__custom_event"] = true;
		else _event = nativeEvent;


		var handlers = _[handlersKey][_event.type];
		if("__dom0__" in nativeEvent) {
			(handlers || (handlers = []))[0] = nativeEvent["__dom0__"];
		}

		if(handlers) {
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
							_event['result'] = _Function_call.call(handler, context || thisObj, _event)
						)
						=== false
					  ) {//Если вернели false - остановим обработку функций
						_event.preventDefault();
						_event.stopPropagation();
					}
				}
				catch(e) {
					errors.push(e);//Все исключения - добавляем в массив, при этом не прерывая цепочку обработчиков.
					errorsMessages.push(e.message);
					if(console)console.error(e);
				}

				if(_event["__stopNow"])break;//Мгновенная остановка обработки событий
			}

			//return changed properties in native 'event' object
			nativeEvent.returnValue = _event.returnValue;
			nativeEvent.cancelBubble = _event.cancelBubble;
			//TODO:: check out that properties need to be returned in native 'event' object or _extend(nativeEvent, event);
			
			if(errors.length == 1) {//Если была только одна ошибка - кидаем ее дальше
				throw errors[0]
			}
			else if(errors.length > 1) {//Иначе делаем общий объект Error со списком ошибок в свойстве errors и кидаем его
				var e = new Error("Multiple errors thrown : " + _event.type + " : " + " : " + errorsMessages.join("|"));
				e.errors = errors;
				throw e;
			}
		}
	}

	if(thisObj === document && !_event.cancelBubble && _event.eventPhase === 3) {
		//Emelate bubbling from document to defaultView (window) | 2 from 2
		commonHandle.call(thisObj.defaultView, _event);
		nativeEvent.cancelBubble = true;//to prevent dubble event fire on window object. First emulated, second native bubbling
	}
}