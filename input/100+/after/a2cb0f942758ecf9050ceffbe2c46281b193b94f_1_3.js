function() {
            var self = this,el = self.get('el');
            var context = self.pagelet?self.pagelet:this;
            var tmpler = context.get('tmpler');
            if (tmpler && !S.isEmptyObject(tmpler.bricks)) {
                var id=false;
                if (self.pagelet) { //如果是pagelet实例化出来的brick调用
                    id = el.attr('id');
                } 
                context._destroyBricks(tmpler.bricks,id);
            }
            else{
                self._detachEvent&&self._detachEvent();
            }
            el.remove();
        }