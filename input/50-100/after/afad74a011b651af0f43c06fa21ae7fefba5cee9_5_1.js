function(){
    	$(this.el).html(template.notificationView.list());
    	this.list = $(this.el).find("#notificationList");
    	this.options.collection.fetch();
    	return this;
    }