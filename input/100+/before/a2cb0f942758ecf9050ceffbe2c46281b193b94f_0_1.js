function Brick() {
        var self = this;
        self.pagelet = arguments[0].pagelet;//pagelet的引用

        var context = self.pagelet?self.pagelet:self;

        context.on('rendered',function(){
           self.initialize();
           self._bindEvent();
        });

        Brick.superclass.constructor.apply(this, arguments);

        if(context.get('rendered')){
            self.initialize();
            self._bindEvent();
        }

        var tmpler = self.get('tmpler'),id;
        if(tmpler){

            if(!tmpler.inDom){
                //模板渲染，则id为本身
                S.each(tmpler.bricks,function(o,k){
                    id=k;
                    return false;
                });
                tmpler.bricks[id].brick = this;
            }
            else{
                //如果已经在dom中，则的id去el节点
                id=self.get('el').attr('id');
            }
        }else{
            //通过pagelet渲染，获取id
            id = arguments[0].el.split('#')[1];
        }
        var renderer = self.constructor.RENDERER;
        id=id||self.constructor.name;
        if(renderer){
            context.get('dataset').setRenderer(renderer,self,id);
        }
    }