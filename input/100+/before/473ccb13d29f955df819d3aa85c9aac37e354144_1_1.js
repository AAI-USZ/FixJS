function (ev) {
            var self = this, result = ev.result, status, event = Uploader.event,
                queue = self.get('queue'), index = self.get('curUploadIndex');
            if (!S.isObject(result)) return false;
            //将服务器端的数据保存到队列中的数据集合
            queue.updateFile(index,{result:result});
            //文件上传状态
            status = Number(result.status);
            // 只有上传状态为1时才是成功的
            if (status === 1) {
                //修改队列中文件的状态为success（上传完成）
                queue.fileStatus(index, Uploader.status.SUCCESS);
                self._success(result.data);
                self.fire(event.SUCCESS,{index : index,file : queue.getFile(index),result:result});
            } else {
                var msg = result.msg || result.message  || EMPTY;
                //修改队列中文件的状态为error（上传失败）
                queue.fileStatus(index, Uploader.status.ERROR, {msg:msg,result:result});
                self.fire(event.ERROR, {status:status,result:result});
            }
            //置空当前上传的文件在队列中的索引值
            self.set('curUploadIndex', EMPTY);
            self.fire(event.COMPLETE,{index : index,file : queue.getFile(index),result:result});
            //存在批量上传操作，继续上传
            self._continueUpload();
        }