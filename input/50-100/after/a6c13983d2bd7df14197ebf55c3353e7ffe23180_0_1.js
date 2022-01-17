function(){
		var _id = $(this.el).find('.sidebar-nav li:first').attr('data-id');
		if (window.STATICS) {window.STATICS.currentList = _id;}

		var _notice = $('.global-notice').text().trim();
		if (_notice) {
			this.initGlobalNotice(_notice);
		}
	}