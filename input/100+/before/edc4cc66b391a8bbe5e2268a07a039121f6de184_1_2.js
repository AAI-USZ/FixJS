function Persistence(tl) {
		this.tl = tl;
		this.saved = true;
		
		var xhr = new XMLHttpRequest();
		xhr.onreadystatechange = function(){
			if (xhr.readyState==4){
				if(xhr.status>=200 &&  xhr.status<400){
					this.saveSuccess(xhr.responseText);
				}else{
					this.saveError(xhr.responseText);
				}
			}
		};
		
		Object.defineProperty(this,'xhr',{get: function(){ return xhr; }});
	}