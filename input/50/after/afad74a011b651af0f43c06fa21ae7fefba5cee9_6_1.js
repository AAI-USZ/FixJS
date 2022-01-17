function() {
    	
    	$(this.el).html(template.notificationView.notification( this.model.toJSON()));

      return this;
    }