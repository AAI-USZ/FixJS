function(){
		var el = this.element;
		var info = $('.info',el);
		var dummy = $('.dummy_btn',el);

		if (dummy.hasClass('off')){
			this._trigger('switch-on',el);
			this._append_javascript();
			info.addClass('info_off').hide();
			dummy.addClass('on').removeClass('off').html(this._real_btn());
		} else {
			this._trigger('switch-off',el);
			info.removeClass('info_off');
			dummy.addClass('off').removeClass('on').html(this.options.dummy_image)
		}
	}