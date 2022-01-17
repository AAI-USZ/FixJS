function(elem){
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
				}