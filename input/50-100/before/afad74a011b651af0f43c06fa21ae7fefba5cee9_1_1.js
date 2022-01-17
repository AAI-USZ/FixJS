function(){
    	var name = $.trim($(this.el).find("#folderName-input").val());
    	console.log(name);
    	if(name.length > 0){
    		this.options.folder.set({name:name});
    		this.options.folder.save();
    		this.options.context.backToMain();
    	}
    }