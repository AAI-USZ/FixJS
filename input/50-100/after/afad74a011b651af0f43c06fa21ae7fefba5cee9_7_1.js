function(){
    	var self = this;
    	
    	this.model.set({read_granted: 0})
		this.model.set({read_denied: 0})
		this.model.set({write_granted: 0})
		this.model.set({write_denied: 0})
		
    	this.model.save(null,{success:function(){
    		self.remove();
    	},error: function(){
    		alert("Error while removing permission")
    	}});
    }