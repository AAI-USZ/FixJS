function () {
            var self = this, uploader = self.get('uploader'),
                queue = uploader.get('queue'),
                successFiles = queue.getFiles('success'),
                len = successFiles.length,
                rule = self.getRule('max'),
                msg;
            if(rule){
            	var button = uploader.get('button'),
	                isPass = len < rule[0];
	            //达到最大允许上传数
	            if(!isPass){
	                //禁用按钮
	                uploader.set('disabled',true);
	                uploader.set('isAllowUpload', false);
                    msg = S.substitute(rule[1],{max : rule[0]});
                    self._fireUploaderError('max',[rule[0],msg]);
	            }else{
	                button.set('disabled',false);
	                uploader.set('isAllowUpload', true);
	            }
	            return isPass;
            }
        }