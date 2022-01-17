function(e){
  		this.picker.hide();
			$(window).off('resize', this.place);
			this.viewMode = 0;
			this.showMode();
			if (!this.isInput) {
				$(document).off('mousedown', this.hide);
			}
			$('body').off('click',$.proxy(this.click, this));
		}