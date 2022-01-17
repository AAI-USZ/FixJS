function(){
		
		var noInputTriggerEvts = {updateInput: 1, input: 1},
			fixInputTypes = {
				date: 1,
				time: 1,
				"datetime-local": 1
			},
			noFocusEvents = {
				focusout: 1,
				blur: 1
			},
			changeEvts = {
				updateInput: 1,
				change: 1
			},
			observe = function(input){
				var timer,
					focusedin = true,
					lastInputVal = input.prop('value'),
					lastChangeVal = lastInputVal,
					trigger = function(e){
						//input === null
						if(!input){return;}
						var newVal = input.prop('value');
						
						if(newVal !== lastInputVal){
							lastInputVal = newVal;
							if(!e || !noInputTriggerEvts[e.type]){
								input.trigger('input');
							}
						}
						if(e && changeEvts[e.type]){
							lastChangeVal = newVal;
						}
						if(!focusedin && newVal !== lastChangeVal){
							input.trigger('change');
						}
					},
					extraTimer,
					extraTest = function(){
						clearTimeout(extraTimer);
						extraTimer = setTimeout(trigger, 9);
					},
					unbind = function(e){
						clearInterval(timer);
						setTimeout(function(){
							if(e && noFocusEvents[e.type]){
								focusedin = false;
							}
							if(input){
								input.unbind('focusout blur', unbind).unbind('input change updateInput', trigger);
								trigger();
							}
							input = null;
						}, 1);
						
					}
				;
				
				clearInterval(timer);
				timer = setInterval(trigger, 160);
				extraTest();
				input.unbind('focusout blur', unbind).unbind('input change updateInput', trigger);
				input.bind('focusout blur', unbind).bind('input updateInput change', trigger);
			}
		;
		if($.event.customEvent){
			$.event.customEvent.updateInput = true;
		}
		
		(function(){
			
			var correctValue = function(elem){
				var i = 1;
				var len = 3;
				var abort, val;
				if(elem.type == 'date' && (isSubmit || !$(elem).is(':focus'))){
					val = elem.value;
					if(val && val.length < 10 && (val = val.split('-')) && val.length == len){
						for(; i < len; i++){
							if(val[i].length == 1){
								val[i] = '0'+val[i];
							} else if(val[i].length != 2){
								abort = true;
								break;
							}
						}
						if(!abort){
							val = val.join('-');
							$.prop(elem, 'value', val);
							return val;
						}
					}
				}
			};
			var inputCheckValidityDesc, formCheckValidityDesc, inputValueDesc, inputValidityDesc;
			
			inputCheckValidityDesc = webshims.defineNodeNameProperty('input', 'checkValidity', {
				prop: {
					value: function(){
						correctValue(this);
						return inputCheckValidityDesc.prop._supvalue.apply(this, arguments);
					}
				}
			});
			
			formCheckValidityDesc = webshims.defineNodeNameProperty('form', 'checkValidity', {
				prop: {
					value: function(){
						$('input', this).each(function(){
							correctValue(this);
						});
						return formCheckValidityDesc.prop._supvalue.apply(this, arguments);
					}
				}
			});
			
			inputValueDesc = webshims.defineNodeNameProperty('input', 'value', {
				prop: {
					set: function(){
						return inputValueDesc.prop._supset.apply(this, arguments);
					},
					get: function(){
						return correctValue(this) || inputValueDesc.prop._supget.apply(this, arguments);
					}
				}
			});
			
			inputValidityDesc = webshims.defineNodeNameProperty('input', 'validity', {
				prop: {
					writeable: false,
					get: function(){
						correctValue(this);
						return inputValidityDesc.prop._supget.apply(this, arguments);
					}
				}
			});
			
			$(document).bind('change', function(e){
				isChangeSubmit = true;
				correctValue(e.target);
				isChangeSubmit = false;
			});
			
		})();
		
		$(document)
			.bind('focusin', function(e){
				if( e.target && fixInputTypes[e.target.type] && !e.target.readOnly && !e.target.disabled ){
					observe($(e.target));
				}
			})
		;
		
		
	}