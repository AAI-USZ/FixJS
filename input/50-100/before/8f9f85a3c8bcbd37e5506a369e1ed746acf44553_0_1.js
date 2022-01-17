function(value){
		if(this.checkboxCmp){
			this.checkboxCmp.setValue(value);
		}else{
			this.collapsed = !value
			if(!value)
				this.collapse()
		}
	}