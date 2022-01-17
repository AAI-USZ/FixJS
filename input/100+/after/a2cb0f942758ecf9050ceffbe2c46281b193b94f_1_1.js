function Chunk() {
        Chunk.superclass.constructor.apply(this, arguments);
        var self = this;

        //现在是串行执行
        self._buildTmpler();
        var tmpler = self.get('tmpler');
        if (tmpler) {
            self.set('id',tmpler.id);
            self.set('el','#'+tmpler.id);
            if (!tmpler.inDom) {
                if (self.get('autoRender')) {
                    self.render();
                }
            } else {
                self.__set("rendered", true);
            }
        }
        else if(!self.pagelet){
            self.__set("rendered", true);
        }
    }