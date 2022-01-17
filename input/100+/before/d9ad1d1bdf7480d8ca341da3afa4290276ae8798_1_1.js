function (entry, opts, aDate)
	{
		var x;
		var label = entry.label;
		opts.left === opts.left ? opts.left : 0;
		opts['margin-left'] === opts['margin-left'] ? opts['margin-left'] : 0;
		opts.height = opts.height ? opts.height : 1;
		var bg = (entry.colour !== '') ? entry.colour : this.options.colors.entryColor;

		if (opts.startMin === 0) {
			opts.startMin = opts.startMin + '0';
		}
		if (opts.endMin === 0) {
			opts.endMin = opts.endMin + '0';
		}
		
		var v = opts.view ? opts.view : 'dayView';
		
		var style = {
				'background-color': this._getColor(bg, aDate),
				'width': opts.width,
				'cursor': 'pointer',
				'margin-left': opts['margin-left'],
				'height': opts.height.toInt() + 'px',
				'top': opts.top.toInt() + 'px',
				'position': 'absolute',
				'border': '1px solid #666666',
				'border-right': '0',
				'border-left': '0',
				'overflow': 'auto',
				'opacity': 0.6
			};
		if (opts.left) {
			style.left = opts.left.toInt() + 1 + 'px';
		}
			
		var id = 'fabrikEvent_' + entry._listid + '_' + entry.id;
		if (opts.view === 'monthView') {
			style.width -= 1;
		}
		var eventCont = new Element('div', {
			'class': 'fabrikEvent',
			'id': id,
			'styles': style
		});
		eventCont.addEvent('mouseenter', this.doPopupEvent.bindWithEvent(this, [entry, label]));		
		
		if (entry.link !== '' && this.options.readonly == 0) {
			x = new Element('a', {'href': entry.link, 'class': 'fabrikEditEvent', 
				'events': {
				'click': function (e) {
						e.stop();
						var o = {};
						var i = e.target.getParent('.fabrikEvent').id.replace('fabrikEvent_', '').split('_');
						o.rowid = i[1];
						o.listid = i[0];
						this.addEvForm(o);					
					}.bind(this)
			}
			}).appendText(label);
		} else {
			x = new Element('span').appendText(label);
		}
		eventCont.adopt(x);
		return eventCont;
	}