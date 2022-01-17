function(){
			if (xhr.readyState==4){
				if(xhr.status>=200 &&  xhr.status<400){
					this.saveSuccess(xhr.responseText);
				}else{
					this.saveError(xhr.responseText);
				}
			}
		}