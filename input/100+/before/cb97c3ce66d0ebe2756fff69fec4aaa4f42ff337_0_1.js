function(element, options){
		this.element = $(element);
		this.format = DPGlobal.parseFormat(options.format||this.element.data('date-format')||'mm/dd/yyyy');
		this.picker = $(DPGlobal.template).appendTo('body').on('mousedown.Datepicker',$.proxy(this.mousedown, this)).on('click.Datepicker',$.proxy(this.click, this));

		this.isInput = this.element.is('input');
		this.component = this.element.is('.date') ? this.element.find('.add-on') : false;
		
		if (this.isInput) {
			this.element.on({
				"focus.Datepicker": $.proxy(this.show, this),
				"click.Datepicker": $.proxy(this.show, this),
				"blur.Datepicker": $.proxy(this.blur, this),
				"keyup.Datepicker": $.proxy(this.update, this),
				"keydow.Datepicker": $.proxy(this.keydown, this)
			});
		} else {
			if (this.component){
				this.component.on('click.Datepicker', $.proxy(this.show, this));
			} else {
				this.element.on('click.Datepicker', $.proxy(this.show, this));
			}
		}
		
		this.viewMode = 0;
		this.weekStart = options.weekStart||this.element.data('date-weekstart')||0;
		this.weekEnd = this.weekStart == 0 ? 6 : this.weekStart - 1;
		this.fillDow();
		this.fillMonths();
		this.update();
		this.showMode();
	}