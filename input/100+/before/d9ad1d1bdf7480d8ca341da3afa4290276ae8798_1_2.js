function (opts)
	{
		var counterDate = opts.curdate;
		var entry = new CloneObject(opts.entry, true, ['enddate', 'startdate']);//for day view to avoid dups when scrolling through days //dont clone the date objs for ie
		var trs = this.el.getElements(opts.divclass + ' tr');
		var hour = (entry.startdate.isSameDay(counterDate)) ? entry.startdate.getHours() - this.options.open : 0;
		( hour < 0 ) ? hour = 0 : hour = hour;
		var i = opts.tdOffset;
		
		entry.label = entry.label ? entry.label : '';
		var td = trs[hour + 1].getElements('td')[i + 1]; 
		var orighours = entry.startdate.getHours();
	
		var rowheight = td.getSize().y;
		//as we buildevent opts twice the sencod parse in IE gives a dif witdth! so store once and always use that value
		this.colwidth[opts.divclass] = this.colwidth[opts.divclass] ? this.colwidth[opts.divclass] : td.getSize().x;
		var top = this.el.getElement(opts.divclass).getElement('tr').getSize().y;
		
		colwidth = this.colwidth[opts.divclass];
		
		var left = (colwidth * i);
		left += this.el.getElement(opts.divclass).getElement('td').getSize().x;
		var duration = Math.ceil(entry.enddate.getHours() - entry.startdate.getHours());
		if (duration === 0) {
			duration = 1;
		}
		
		if (entry.startdate.getDay() !== entry.enddate.getDay()) {
			duration = ( this.options.open != 0 || this.options.close != 24 ) ? this.options.close - this.options.open + 1 : 24;
			if (entry.startdate.isSameDay(counterDate)) {
				duration = ( this.options.open != 0 || this.options.close != 24 ) ? this.options.close - this.options.open + 1 : 24 - entry.startdate.getHours();
			} else {
				entry.startdate.setHours(0);
				if (entry.enddate.isSameDay(counterDate)) {
					duration = ( this.options.open != 0 || this.options.close != 24 ) ? this.options.close - this.options.open : entry.enddate.getHours();
				}
			}
		}

		top = top + (rowheight * hour);
		var height = (rowheight * duration);
		
		if (entry.enddate.isSameDay(counterDate)) {
			height += (entry.enddate.getMinutes() / 60 * rowheight);
		}
		if (entry.startdate.isSameDay(counterDate)) {
			top += (entry.startdate.getMinutes() / 60 * rowheight);
			height -= (entry.startdate.getMinutes() / 60 * rowheight);
		} 
		
		var existing = td.getElements('.fabrikEvent');
		var width = colwidth / (existing.length + 1);
		var marginleft = width * existing.length;
		existing.setStyle('width', width + 'px');
		var v = opts.divclass.substr(1, opts.divclass.length);
		width -= td.getStyle('border-width').toInt(); 
		opts = {'margin-left': marginleft + 'px', 'width': width + 'px', 'height': height, 'view': 'weekView', 'background-color': this._getColor(this.options.colors.headingBg)};
		opts.left = left;
		opts.top = top;
		opts.color = this._getColor(this.options.colors.headingColor, entry.startdate);
		opts.startHour = entry.startdate.getHours();
		opts.endHour = opts.startHour + duration;
		opts.startMin = entry.startdate.getMinutes();
		opts.endMin = entry.enddate.getMinutes();
		entry.startdate.setHours(orighours);
		return opts;
	}