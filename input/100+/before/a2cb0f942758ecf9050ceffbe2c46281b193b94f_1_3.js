function() {
            var self = this;
            //todo 如果是调用的brick的destroy，需要查找移除引用
            var el = self.get('el'),id=null;
            if (self.pagelet) { //如果是pagelet实例化出来的brick调用
                id = el.attr('id');
            }
            var tmpler = self.get('tmpler');
            if (tmpler && !S.isEmptyObject(tmpler.bricks)) {
                self._destroyBricks(tmpler.bricks,id);
            }
            else{
                self._detachEvent&&self._detachEvent();
            }
            el.remove();
        }