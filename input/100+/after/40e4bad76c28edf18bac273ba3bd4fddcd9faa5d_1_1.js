function(settings){         //function(settings){ ... return html; }
				var strBuilder =  [
					'<div class="' + settings.wrapperCls + '">',
					'<div class="' +  settings.innerCls + '">',
					(settings.title ? '<div class="' + settings.baseCls + '-title">' + settings.title + '</div>' : ''),
					(settings.closeBtn ? '<button class="' + settings.baseCls + '-close" data-handler="destroy"><span>x</span></button>' : '')
				];
				if (settings.dialog) {
					strBuilder.push(
						'<div class="' + settings.baseCls + '-message">' + settings.message +
							(settings.loader ? '<div class="' + settings.baseCls + '-loader"></div>' : '') +
							'</div>'
					);
				} else {
					strBuilder.push(
						'<div class="' + settings.baseCls + '-message">' + settings.message + '</div>',
						(settings.loader ? '<div class="' + settings.baseCls + '-loader"></div>' : '')
					);
				}
				if (settings.buttons) {
					var btnPh = $('<div />');
					_.each(settings.buttons, function(btn){
						btnPh.append($('<button/>', btn));
					});
					strBuilder.push('<div class="' + settings.baseCls + '-btns">' + btnPh.html() + '</div>');
				}
				strBuilder.push('</div></div>');
				return strBuilder.join('');
			}