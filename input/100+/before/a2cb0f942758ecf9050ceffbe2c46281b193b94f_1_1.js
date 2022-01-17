function Chunk() {
        Chunk.superclass.constructor.apply(this, arguments);
        var self = this;

        //现在是串行执行
        self._buildTmpler();
        var tmpler = self.get('tmpler');
        if (tmpler) {
            if (!tmpler.inDom) {
                if (self.get('autoRender')) {
                    self.render();
                }
            } else {
                self.__set('el', self.get('tmpl')); //如果已经在dom中，则把当前节点设置为模板容器节点
                self.__set("rendered", true);
                self.fire('rendered');
            }
        }
        else if(!self.pagelet){
            self.__set("rendered", true);
        }
    }