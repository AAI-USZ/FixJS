function(err, data){
            if(err){
                utils.log(err, 'error');
                throw self.error(err);
            }

            config.inputEncoding = config.inputEncoding ? config.inputEncoding : utils.detectCharset(data);
            var fileContent = iconv.decode(data, config.inputEncoding);
            utils.log('file charset is: ' + config.inputEncoding, 'debug');

            // preserve data url and comment.
            var preservedTokens = [];
            fileContent = compressor._extractDataUrls(fileContent, preservedTokens);
            fileContent = compressor._extractComments(fileContent, preservedTokens);

            // start analyze file content
            self.analyzeImports(fileContent, function(data){
                utils.log('analyze done.', 'debug');
                // after combo, @charset position may be changed. since the output file encoding is specified, we should remove @charset.
                data = data.replace(/@charset\s+['|"](\w*)["|'];/g, '');
                // restore all comments back.
                data = compressor._restoreComments(data, preservedTokens);
                self.generateOutput(data);
                callback && callback();
            });
        }