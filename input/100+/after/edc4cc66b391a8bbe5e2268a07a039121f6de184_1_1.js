function Persistence(tl) {
		var that = this;
		this.tl = tl;
		this.saved = true;		
		this.xhr = new XMLHttpRequest();
		this.xhr.onreadystatechange = function(){
			if(this.readyState==4){
				if(this.status>=200 &&  this.status<400){
					that.saveSuccess(this.responseText);
				}else{
					that.saveError(this.responseText);
				}
			}
		};
		
		Object.defineProperty(this,'xhr',{writable: false});
	}