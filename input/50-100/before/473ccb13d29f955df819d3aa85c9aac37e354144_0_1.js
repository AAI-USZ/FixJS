function(f){
	                if(f.name == fileName){
	                    self._stopUpload(file,msg);
	                    self.fire(Auth.event.ERROR,{rule:'allowRepeat',msg : msg,value : rule[0]});
	                    return isRepeat = true;
	                }
	            }