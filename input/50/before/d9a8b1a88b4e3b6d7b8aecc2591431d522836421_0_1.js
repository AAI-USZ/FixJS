function(){
		log.debug(' + Build html..',this.logAuthor)
		if(this.data){
			this.component_name = this.data.component
			this.build(this.data)
		}else{
			this.buildEmpty()
		}
	}