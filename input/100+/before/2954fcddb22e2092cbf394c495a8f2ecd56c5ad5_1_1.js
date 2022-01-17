function() {

		// контекст скроллинга
		var box_h = this.el.height();
		var content_h = this.content.el.height();
		var sb_h = this.scrollbar.el.height();
		
		if(box_h >= content_h) {
			this.scrollbar.hide();
			return;
		}
		
		
		if(!this.scrollbar.el.is(':visible')) {
			this.scrollbar.show();
		}
		
		var x = box_h / content_h;
		
		
		
		var y = - parseInt(this.content.el.css('margin-top').replace("px", ""));
				
		var dh = this.scrollbar.scroller.el.outerHeight(false) - this.scrollbar.scroller.el.height();
		
		this.scrollbar.scroller.el.height(Math.max(x*sb_h - dh, 10));
		
		this.scrollTo(y);
	}