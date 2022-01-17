function(e){
  		this.picker.hide();
			$(window).off('resize.Datepicker', this.place);
			this.viewMode = 0;
			this.showMode();
			if (!this.isInput) {
				$(document).off('mousedown.Datepicker', this.hide);
			}
			$('body').off('click.Datepicker',$.proxy(this.click, this));
		}