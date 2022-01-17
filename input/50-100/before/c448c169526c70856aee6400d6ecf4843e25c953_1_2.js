function(){
                        // 抓取restoreHook容器内的数据，生成文件DOM
                        uploader.restore();
                        theme.afterUploaderRender(uploader);
                        self.fire('init', {uploader:uploader,button:uploader.get('button'),queue:uploader.get('queue'),auth:uploader.get('auth')});
                    }