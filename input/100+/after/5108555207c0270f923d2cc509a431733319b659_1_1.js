function () {
//            console.log('render', this.get('target'));
            var self = this,mode = self.get('mode'),
                uploader = self.get('uploader'),
                $dropArea;
            if(uploader.get('type') == 'flash'){
                S.log('flash上传方式不支持拖拽！');
                self.set('isSupport',false);
                return false;
            }
            if(mode != 'supportDrop'){
                S.log('该浏览器不支持拖拽上传！');
                self.set('isSupport',false);
                return false;
            }
            if(!uploader){
                S.log('缺少Uploader的实例！');
                return false;
            }
            $dropArea = self._createDropArea();
            if($dropArea.length){
                $dropArea.on('click',self._clickHandler,self);
            }
            //当uploader的禁用状态发生改变后显隐拖拽区域
            uploader.on('afterDisabledChange',function(ev){
                self[ev.newVal && 'hide' || 'show']();
            });
            self.fire('afterRender', {'buttonTarget':self.get('buttonWrap')});
        }