function(){
	Modernizr.textareaPlaceholder = !!('placeholder' in $('<textarea />')[0]);
	if(Modernizr.input.placeholder && Modernizr.textareaPlaceholder){return;}
	var isOver = (webshims.cfg.forms.placeholderType == 'over');
	var polyfillElements = ['textarea'];
	if(!Modernizr.input.placeholder){
		polyfillElements.push('input');
	}
	
	var setSelection = function(elem){
		if(elem.setSelectionRange){
			elem.setSelectionRange(0, 0);
			return true;
		} else if(elem){
			var range = elem.createTextRange();
			range.collapse(true);
			range.moveEnd('character', 0);
			range.moveStart('character', 0);
			range.select();
			return true;
		}
	};
	
	var hidePlaceholder = function(elem, data, value, _onFocus){
			if(value === false){
				value = $.prop(elem, 'value');
			}
			if(!isOver && elem.type != 'password'){
				if(!value && _onFocus && setSelection(elem)){
					var selectTimer;
					$(elem)
						.unbind('.placeholderremove')
						.bind('keydown.placeholderremove keypress.placeholderremove paste.placeholderremove input.placeholderremove', function(e){
							if(e && (e.keyCode == 17 || e.keyCode == 16)){return;}
							elem.value = $.prop(elem, 'value');
							data.box.removeClass('placeholder-visible');
							clearTimeout(selectTimer);
							$(elem).unbind('.placeholderremove');
						})
						.bind('mousedown.placeholderremove drag.placeholderremove select.placeholderremove', function(e){
							setSelection(elem);
							clearTimeout(selectTimer);
							selectTimer = setTimeout(function(){
								setSelection(elem);
							}, 9);
						})
						.bind('blur.placeholderremove', function(){
							clearTimeout(selectTimer);
							$(elem).unbind('.placeholderremove');
						})
					;
					return;
				}
				elem.value = value;
			} else if(!value && _onFocus){
				$(elem)
					.unbind('.placeholderremove')
					.bind('keydown.placeholderremove keypress.placeholderremove paste.placeholderremove input.placeholderremove', function(e){
						if(e && (e.keyCode == 17 || e.keyCode == 16)){return;}
						data.box.removeClass('placeholder-visible');
						$(elem).unbind('.placeholderremove');
					})
					.bind('blur.placeholderremove', function(){
						$(elem).unbind('.placeholderremove');
					})
				;
				return;
			}
			data.box.removeClass('placeholder-visible');
		},
		showPlaceholder = function(elem, data, placeholderTxt){
			if(placeholderTxt === false){
				placeholderTxt = $.prop(elem, 'placeholder');
			}
			
			if(!isOver && elem.type != 'password'){
				elem.value = placeholderTxt;
			}
			data.box.addClass('placeholder-visible');
		},
		changePlaceholderVisibility = function(elem, value, placeholderTxt, data, type){
			if(!data){
				data = $.data(elem, 'placeHolder');
				if(!data){return;}
			}
			$(elem).unbind('.placeholderremove');
			if(type == 'focus' || (!type && elem === document.activeElement)){
				if(elem.type == 'password' || isOver || $(elem).hasClass('placeholder-visible')){
					hidePlaceholder(elem, data, '', true);
				}
				return;
			}
			if(value === false){
				value = $.prop(elem, 'value');
			}
			if(value){
				hidePlaceholder(elem, data, value);
				return;
			}
			if(placeholderTxt === false){
				placeholderTxt = $.attr(elem, 'placeholder') || '';
			}
			if(placeholderTxt && !value){
				showPlaceholder(elem, data, placeholderTxt);
			} else {
				hidePlaceholder(elem, data, value);
			}
		},
		createPlaceholder = function(elem){
			elem = $(elem);
			var id 			= elem.prop('id'),
				hasLabel	= !!(elem.prop('title') || elem.attr('aria-labelledby'))
			;
			if(!hasLabel && id){
				hasLabel = !!( $('label[for="'+ id +'"]', elem[0].form)[0] );
			}
			if(!hasLabel){
				if(!id){
					id = $.webshims.getID(elem);
				}
				hasLabel = !!($('label #'+ id)[0]);
			}
			return $( hasLabel ? '<span class="placeholder-text"></span>' : '<label for="'+ id +'" class="placeholder-text"></label>');
		},
		pHolder = (function(){
			var delReg 	= /\n|\r|\f|\t/g,
				allowedPlaceholder = {
					text: 1,
					search: 1,
					url: 1,
					email: 1,
					password: 1,
					tel: 1
				}
			;
			
			return {
				create: function(elem){
					var data = $.data(elem, 'placeHolder');
					if(data){return data;}
					data = $.data(elem, 'placeHolder', {});
					
					$(elem).bind('focus.placeholder blur.placeholder', function(e){
						changePlaceholderVisibility(this, false, false, data, e.type );
						data.box[e.type == 'focus' ? 'addClass' : 'removeClass']('placeholder-focused');
					});
					if(elem.form){
						$(elem.form).bind('reset.placeholder', function(e){
							setTimeout(function(){
								changePlaceholderVisibility(elem, false, false, data, e.type );
							}, 0);
						});
					}
					
					if(elem.type == 'password' || isOver){
						data.text = createPlaceholder(elem);
						data.box = $(elem)
							.wrap('<span class="placeholder-box placeholder-box-'+ (elem.nodeName || '').toLowerCase() +'" />')
							.parent()
						;
	
						data.text
							.insertAfter(elem)
							.bind('mousedown.placeholder', function(){
								changePlaceholderVisibility(this, false, false, data, 'focus');
								try {
									setTimeout(function(){
										elem.focus();
									}, 0);
								} catch(e){}
								return false;
							})
						;
						
						
		
						$.each(['Left', 'Top'], function(i, side){
							var size = (parseInt($.curCSS(elem, 'padding'+ side), 10) || 0) + Math.max((parseInt($.curCSS(elem, 'margin'+ side), 10) || 0), 0) + (parseInt($.curCSS(elem, 'border'+ side +'Width'), 10) || 0);
							data.text.css('padding'+ side, size);
						});
						var lineHeight 	= $.curCSS(elem, 'lineHeight'),
							dims 		= {
								width: $(elem).width(),
								height: $(elem).height()
							},
							cssFloat 		= $.curCSS(elem, 'float')
						;
						$.each(['lineHeight', 'fontSize', 'fontFamily', 'fontWeight'], function(i, style){
							var prop = $.curCSS(elem, style);
							if(data.text.css(style) != prop){
								data.text.css(style, prop);
							}
						});
						
						if(dims.width && dims.height){
							data.text.css(dims);
						}
						if(cssFloat !== 'none'){
							data.box.addClass('placeholder-box-'+cssFloat);
						}
					} else {
						var reset = function(e){
							if($(elem).hasClass('placeholder-visible')){
								hidePlaceholder(elem, data, '');
								if(e && e.type == 'submit'){
									setTimeout(function(){
										if(e.isDefaultPrevented()){
											changePlaceholderVisibility(elem, false, false, data );
										}
									}, 9);
								}
							}
						};
						
						$(window).bind('beforeunload', reset);
						data.box = $(elem);
						if(elem.form){
							$(elem.form).submit(reset);
						}
					}
					
					return data;
				},
				update: function(elem, val){
					if(!allowedPlaceholder[$.prop(elem, 'type')] && !$.nodeName(elem, 'textarea')){
						webshims.warn("placeholder not allowed on type: "+ $.prop(elem, 'type'));
						return;
					}
					
					var data = pHolder.create(elem);
					if(data.text){
						data.text.text(val);
					}
					
					changePlaceholderVisibility(elem, false, val, data);
				}
			};
		})()
	;
	
	$.webshims.publicMethods = {
		pHolder: pHolder
	};
	polyfillElements.forEach(function(nodeName){
		var desc = webshims.defineNodeNameProperty(nodeName, 'placeholder', {
			attr: {
				set: function(val){
					var elem = this;
					webshims.contentAttr(elem, 'placeholder', val);
					pHolder.update(elem, val);
				},
				get: function(){
					return webshims.contentAttr(this, 'placeholder');
				}
			},
			reflect: true,
			initAttr: true
		});
	});
	
	
	polyfillElements.forEach(function(name){
		var placeholderValueDesc =  {};
		var desc;
		['attr', 'prop'].forEach(function(propType){
			placeholderValueDesc[propType] = {
				set: function(val){
					var elem = this;
					var placeholder = webshims.contentAttr(elem, 'placeholder');
					$.removeData(elem, 'cachedValidity');
					var ret = desc[propType]._supset.call(elem, val);
					if(placeholder && 'value' in elem){
						changePlaceholderVisibility(elem, val, placeholder);
					}
					return ret;
				},
				get: function(){
					var elem = this;
					return $(elem).hasClass('placeholder-visible') ? '' : desc[propType]._supget.call(elem);
				}
			};
		});
		desc = webshims.defineNodeNameProperty(name, 'value', placeholderValueDesc);
	});
	
}