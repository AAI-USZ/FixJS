function($){
	var Modernizr = window.Modernizr;
	var webshims = $.webshims;
	var bugs = webshims.bugs;
	var form = $('<form action="#" style="width: 1px; height: 1px; overflow: hidden;"><select name="b" required /><input type="date" required name="a" /><input type="submit" /></form>');
	var testRequiredFind = function(){
		if(form[0].querySelector){
			try {
				bugs.findRequired = !(form[0].querySelector('select:required'));
			} catch(er){
				bugs.findRequired = false;
			}
		}
	};
	bugs.findRequired = false;
	bugs.validationMessage = false;
	bugs.valueAsNumberSet = false;
	
	webshims.capturingEventPrevented = function(e){
		if(!e._isPolyfilled){
			var isDefaultPrevented = e.isDefaultPrevented;
			var preventDefault = e.preventDefault;
			e.preventDefault = function(){
				clearTimeout($.data(e.target, e.type + 'DefaultPrevented'));
				$.data(e.target, e.type + 'DefaultPrevented', setTimeout(function(){
					$.removeData(e.target, e.type + 'DefaultPrevented');
				}, 30));
				return preventDefault.apply(this, arguments);
			};
			e.isDefaultPrevented = function(){
				return !!(isDefaultPrevented.apply(this, arguments) || $.data(e.target, e.type + 'DefaultPrevented') || false);
			};
			e._isPolyfilled = true;
		}
	};
	
	if(!Modernizr.formvalidation || bugs.bustedValidity){
		testRequiredFind();
		return;
	}
	
	//create delegatable events
	webshims.capturingEvents(['input']);
	webshims.capturingEvents(['invalid'], true);
	
	Modernizr.bugfreeformvalidation = true;
	if(window.opera || $.browser.webkit || window.testGoodWithFix){
		var dateElem = $('input', form).eq(0);
		var timer;
		var onDomextend = function(fn){
			webshims.loader.loadList(['dom-extend']);
			webshims.ready('dom-extend', fn);
		};
		var loadFormFixes = function(e){
			var reTest = ['form-extend', 'form-message', 'form-native-fix'];
			if(e){
				e.preventDefault();
				e.stopImmediatePropagation();
			}
			clearTimeout(timer);
			setTimeout(function(){
				if(!form){return;}
				form.remove();
				form = dateElem = null;
			}, 9);
			if(!Modernizr.bugfreeformvalidation){
				webshims.addPolyfill('form-native-fix', {
					f: 'forms',
					d: ['form-extend']
				});
				//remove form-extend readyness
				webshims.modules['form-extend'].test = $.noop;
			} 
			
			if(webshims.isReady('form-number-date-api')){
				reTest.push('form-number-date-api');
			}
			
			webshims.reTest(reTest);
			
			if(dateElem){
				try {
					if(dateElem.prop({disabled: true, value: ''}).prop('disabled', false).is(':valid')){
						onDomextend(function(){
							webshims.onNodeNamesPropertyModify(['input', 'textarea', 'select'], ['disabled', 'readonly'], {
								set: function(){
									var elem = this;
									if(!elem.disabled){
										$(elem).val( $(elem).val() );
									}
								}
							});
						});
					}
				} catch(er){}
			}
			
			if ($.browser.opera || window.testGoodWithFix) {
				onDomextend(function(){
					
					//Opera shows native validation bubbles in case of input.checkValidity()
					// Opera 11.6/12 hasn't fixed this issue right, it's buggy
					var preventDefault = function(e){
						e.preventDefault();
					};
					
					['form', 'input', 'textarea', 'select'].forEach(function(name){
						var desc = webshims.defineNodeNameProperty(name, 'checkValidity', {
							prop: {
								value: function(){
									if (!webshims.fromSubmit) {
										$(this).bind('invalid.checkvalidity', preventDefault);
									}
									
									webshims.fromCheckValidity = true;
									var ret = desc.prop._supvalue.apply(this, arguments);
									if (!webshims.fromSubmit) {
										$(this).unbind('invalid.checkvalidity', preventDefault);
									}
									webshims.fromCheckValidity = false;
									return ret;
								}
							}
						});
					});
					
					//options only return options, if option-elements are rooted: but this makes this part of HTML5 less backwards compatible
					if(Modernizr.input.list && !($('<datalist><select><option></option></select></datalist>').prop('options') || []).length ){
						webshims.defineNodeNameProperty('datalist', 'options', {
							prop: {
								writeable: false,
								get: function(){
									var options = this.options || [];
									if(!options.length){
										var elem = this;
										var select = $('select', elem);
										if(select[0] && select[0].options && select[0].options.length){
											options = select[0].options;
										}
									}
									return options;
								}
							}
						});
					}
					
				});
			}
		};
		
		form.appendTo('head');
		if(window.opera || window.testGoodWithFix) {
			testRequiredFind();
			bugs.validationMessage = !(dateElem.prop('validationMessage'));
			if((Modernizr.inputtypes || {}).date){
				try {
					dateElem.prop('valueAsNumber', 0);
				} catch(er){}
				bugs.valueAsNumberSet = (dateElem.prop('value') != '1970-01-01');
			}
			dateElem.prop('value', '');
		}
		
		form.bind('submit', function(e){
			Modernizr.bugfreeformvalidation = false;
			loadFormFixes(e);
		});
		
		timer = setTimeout(function(){
			form && form.triggerHandler('submit');
		}, 9);
		
		$('input, select', form).bind('invalid', loadFormFixes)
			.filter('[type="submit"]')
			.bind('click', function(e){
				e.stopImmediatePropagation();
			})
			.trigger('click')
		;
		
	}
	
	
	
	
}