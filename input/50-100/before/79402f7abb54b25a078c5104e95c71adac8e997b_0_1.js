function(data){
                    if(content){
                        content = content.replace(result[0], '\n' + data + '\n');
                        content = self.analyzeImports(content, callback);
                    }else{
                        utils.log('no content', 'debug');
                    }
                }