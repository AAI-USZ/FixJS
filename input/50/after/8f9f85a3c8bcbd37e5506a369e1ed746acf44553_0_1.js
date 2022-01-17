function() {
		if(this.value == true)
			this.collapsed = false
			
		if(!this.name)
			this.name = this.checkboxName
		
        this.callParent(arguments);
    }