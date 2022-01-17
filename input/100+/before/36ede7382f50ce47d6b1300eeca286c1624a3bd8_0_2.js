function(){
		var $el = $(this.el);
		$el.empty();
		if(this.templateKey) {
			$el.append(this.page.app.templateEngine.parse(this.templateKey, this.model));
			return;
		} 
		if(this.getContent!=null) {
			//$(this.el).empty().append($(this.getContent()));
			$(this.el).empty().append($(this.getContent()));
		} else {
			return $(this.el).empty().append("<p>Default Block Content</p>");
		}
	}