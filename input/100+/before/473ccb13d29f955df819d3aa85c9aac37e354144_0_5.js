function(file){
            if(!S.isObject(file)) return false;
            var self = this,
                fileName = file.name,
                rule = self.getRule('allowRepeat');
            if(rule){
            	var isAllowRepeat = rule[0],
	                msg = rule[1],
	                uploader = self.get('uploader'),
	                queue = uploader.get('queue'),
	                //上传成功的文件
	                files = queue.getFiles('success'),
	                isRepeat = false ;
	            //允许重复文件名，直接返回false
	            if(isAllowRepeat) return false;
	            S.each(files,function(f){
	                if(f.name == fileName){
	                    self._stopUpload(file,msg);
	                    self.fire(Auth.event.ERROR,{rule:'allowRepeat',msg : msg,value : rule[0]});
	                    return isRepeat = true;
	                }
	            });
	            return isRepeat;
            }
        }