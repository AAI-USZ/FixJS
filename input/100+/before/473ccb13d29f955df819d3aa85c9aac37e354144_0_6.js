function (file,msg) {
            if(!S.isString(msg)) msg = EMPTY;
            var self = this, uploader = self.get('uploader'),
                queue = uploader.get('queue'),
                index = queue.getFileIndex(file.id);
            //改变文件状态为error
            queue.fileStatus(index, queue.constructor.status.ERROR, {msg:msg});
        }