function(file){
            var self = this,
                size = file.size,
                rule = self.getRule('maxSize');
            if(rule){
            	var maxSize = Number(rule[0]) * 1000,
	                isAllow = size <= maxSize,
	                msg;
	            if(!isAllow){
	                msg = S.substitute(rule[1],{maxSize:S.convertByteSize(maxSize),size : file.textSize});
	                self._stopUpload(file,msg);
	                self.fire(Auth.event.ERROR,{rule:'maxSize',msg : msg,value : rule[0]});
	            }
	            return isAllow;
            }
        }