function(ruleName,rule,file){
            var self = this,
                uploader = self.get('uploader'),
                queue = uploader.get('queue'),
                params = {status:-1,rule:ruleName},
                index = -1;
            if(file){
                S.mix(params,{file:file});
                index = queue.getFileIndex(params.file.id);
            }
            if(rule) S.mix(params,{msg : rule[1],value : rule[0]});
            queue.fileStatus(index, 'error', params);
            self.fire(Auth.event.ERROR,params);
            uploader.fire('error',params);
        }