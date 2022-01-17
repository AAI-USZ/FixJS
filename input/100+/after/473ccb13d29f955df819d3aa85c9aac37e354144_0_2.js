function (file) {
            if (!S.isObject(file)) return false;
            var self = this,
                fileName = file.name,
                allowExts = self.getRule('allowExts'),
                exts = [],
                fileExt, msg,
                isAllow;
            if (!S.isArray(allowExts)) return false;
            //扩展名数组
            exts = self._getExts(allowExts[0].ext);

            isAllow = _isAllowUpload(fileName);
            //如果不是支持的文件格式，出现错误
            if(!isAllow){
                fileExt = _getFileExt(fileName);
                msg = S.substitute(allowExts[1],{ext : fileExt});
                self._fireUploaderError('allowExts',[allowExts[0],msg],file);
            }
            /**
             * 是否允许上传
             * @param {String} fileName 文件名
             * @return {Boolean}
             */
            function _isAllowUpload(fileName) {
                var isAllow = false, reg;
                S.each(exts, function (ext) {
                    reg = new RegExp('^.+\.' + ext + '$');
                    //存在该扩展名
                    if (reg.test(fileName))  return isAllow = true;
                });
                return isAllow;
            }
            /**
             * 获取文件扩展名
             * @param {String} file
             */
            function _getFileExt(file){
                var arr = file.split('.');
                return arr[arr.length -1];
            }
            return isAllow;
        }