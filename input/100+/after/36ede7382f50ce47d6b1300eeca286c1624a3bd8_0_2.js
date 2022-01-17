function(){
		$(this.el).remove();
		this.setElement(this.make(this.tagName, this.attributes));
		var $el = $(this.el);
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