function(value){
		if(value == undefined)
			value = false
			
		if(this.checkboxCmp){
			this.checkboxCmp.setValue(value);
		}else{
			this.collapsed = !value
			if(!value)
				this.collapse()
			else
				this.expand()
		}
	}