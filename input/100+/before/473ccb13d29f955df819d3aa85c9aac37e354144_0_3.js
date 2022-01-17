function () {
            var self = this, uploader = self.get('uploader'),
                queue = uploader.get('queue'),
                successFiles = queue.getFiles('success'),
                len = successFiles.length,
                rule = self.getRule('max');
            if(rule){
            	var button = uploader.get('button'),
	                isPass = len < rule[0];
	            //达到最大允许上传数
	            if(!isPass){
	                //禁用按钮
	                button.set('disabled',true);
	                uploader.set('isAllowUpload', false);
	                self.fire(Auth.event.ERROR,{rule:'max',msg : rule[1],value : rule[0]});
	            }else{
	                button.set('disabled',false);
	                uploader.set('isAllowUpload', true);
	            }
	            return isPass;
            }
        }