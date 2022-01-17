function(y) {
				
		// контекст скроллинга
		var box_h = this.el.height();
		var content_h = this.content.el.height();
		var sb_h = this.scrollbar.el.height();
		
//		if( y > content_h - box_h ) y = content_h - box_h;

		var max_y = content_h - box_h;
		var min_y = 0;
		
		y = Math.min(y, max_y);
		y = Math.max(y, min_y);

		
		this.content.el.css({'margin-top': -y});
		
		var x = y / content_h;
		
		
/*				
				var scroller_h = this.scrollbar.scroller.el.outerHeight(false);
				
				y = x * sb_h;
				
				var max_y = sb_h - scroller_h;
				var min_y = 0;
				
				y = Math.min(max_y, y);
				y = Math.max(min_y, y);
*/				
		this.scrollbar.scroller.el.css({'margin-top': (x*sb_h)});
		
	}