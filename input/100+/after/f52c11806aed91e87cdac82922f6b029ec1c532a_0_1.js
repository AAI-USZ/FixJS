function(content, callback){
        var self = this;
        if(content){
            var reg = /@import\s*(url)?\(?['|"]([^'"]+)\.css['|"]\)?[^;]*;/ig,
                result;
            result = reg.exec(content);
            if(typeof result != 'undefined' && result && result[2]){
                var filePath = result[2] + '.css';
                self.imports.push(filePath);
                self.getFileContent(filePath, function(data){
                    if(content){
                        content = content.replace(result[0], '\n' + data + '\n');
                        content = self.analyzeImports(content, callback);
                    }else{
                        utils.log('no content', 'debug');
                    }
                });
            }else{
                callback && callback(content);
            }
        }else{
            utils.log('content empty.', 'debug');
            callback && callback(content);
        }
    }