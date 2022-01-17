function() {
            var self = this;
            //加载css
            self._loadCss();
            //开始替换
            self._replaceKfbtn();
            //事件绑定
            self._bindEvent();
//            self.fire(self.get('events').RENDER);
        }