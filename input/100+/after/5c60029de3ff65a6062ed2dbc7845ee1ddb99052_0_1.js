function(file, callback){
        var self = this,
            config = self.config,
            content = '';
        if(!self.isRemoteFile(file)){
            if(!self.isExcluded(file)){
                var filePath = path.resolve(config.base, file);
                if(fs.existsSync(filePath)){
                    var buf = fs.readFileSync(filePath);
                    content = iconv.decode(buf, config.inputEncoding ? config.inputEncoding : utils.detectCharset(buf));
                }else{
                    utils.log('cannot find file ' + filePath, 'warning');
                }
            }else{
                utils.log('file excluded: ' + file, 'debug');
            }
            callback && callback(content);
        }else{
            utils.log('Try to get remote file: ' + file, 'debug');
            utils.getRemoteFile(file, function(data, charset){
                content = iconv.decode(data, charset);
                callback && callback(content);
            });
        }
    }