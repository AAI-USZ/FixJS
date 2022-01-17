function (elementToFix) {
						if(elementToFix) {
							var old_addEventListener = elementToFix.addEventListener,
								old_removeEventListener = elementToFix.removeEventListener;

							if(old_addEventListener) {
								elementToFix.addEventListener = function(type, listener, useCapture) {
									var _,
										_eventsUUID;

									useCapture = useCapture || false;

									if(_addEventListener_dublicate_bug || implementation_stopImmediatePropagation) {
										_eventsUUID = _event_eventsUUID + (useCapture ? "-" : "") + (listener[_event_handleUUID] || (listener[_event_handleUUID] = ++UUID)) + type
									
										if(!(_ = this["_"]))_ = this["_"] = {};
										//If multiple identical EventListeners are registered on the same EventTarget with the same parameters, the duplicate instances are discarded. They do not cause the EventListener to be called twice, and since the duplicates are discarded, they do not need to be removed manually with the removeEventListener method.
										if(_eventsUUID in _)return;

										listener = implementation_stopImmediatePropagation ? (
											_[_eventsUUID] = _unSafeBind.call(implementation_stopImmediatePropagation, {_listener : listener, _this : this})
										) : (_[_eventsUUID] = void 0), listener;
									}

									return old_addEventListener.call(this, type, listener, useCapture);
								};

								//elementToFix.addEventListener.__shim__ = true;
								if(old_removeEventListener)elementToFix.removeEventListener = function(type, listener, useCapture) {
									var _,
										_eventsUUID;

									useCapture = useCapture || false;

									if(_addEventListener_dublicate_bug || implementation_stopImmediatePropagation) {
										_ = this["_"];
										if(_ && _[_eventsUUID = _event_eventsUUID + (useCapture ? "-" : "") + listener[_event_handleUUID] + type]) {
											listener = _[_eventsUUID];
											delete _[_eventsUUID];
										}
									}

									return old_removeEventListener.call(this, type, listener, useCapture);
								};
								//elementToFix.removeEventListener.__shim__ = true;
							}
						}
					}