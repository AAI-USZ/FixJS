function(file){
                //服务器端路径赋值
                if(!file.sUrl && file.result) file.sUrl = file.result.data.url;
                //向队列添加文件
                var fileData = queue.add(file),
                    id = fileData.id,index = queue.getFileIndex(id);
                urlsInput.add(file.sUrl);
                //改变文件状态为成功
                queue.fileStatus(index,'success',{index:index,id:id,file:fileData});
            }