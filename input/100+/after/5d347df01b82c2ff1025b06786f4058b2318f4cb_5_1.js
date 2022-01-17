function(){
            var expanders=baidu.dom.query(".grid-expand:not(.expanded)",g.element);
            baidu.array.each(expanders,function(e){
                baidu.event.fire(e,"click");
            });
        }