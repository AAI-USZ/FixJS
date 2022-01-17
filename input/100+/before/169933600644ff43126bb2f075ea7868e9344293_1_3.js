function(settings){
				var c = (settings.baseCls + ' ') +
                        (settings.type ? settings.type + ' ' : '') +
                        ('theme-' + settings.theme + ' ') +
                        (settings.dialog ? 'dialog ' : '') +
                        ('pos-' + settings.position + ' ') +
                        (settings.buttons ? 'with-buttons ' : '') +
                        (settings.loader ? 'with-loader ' : '');
				return $.trim(c).split(' ').join(' ' + settings.baseCls + '-') +
                    ' ' + (settings.cls || '');
			}