function(){
    	$(this.el).find("a").text(this.model.get('name'));
    	this.messageContainer.find("#folderName").text(this.model.get('name'));
    }