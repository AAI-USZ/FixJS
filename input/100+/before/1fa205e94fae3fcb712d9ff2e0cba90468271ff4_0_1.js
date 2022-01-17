function(main){
        var me = this;

        if (!me._isRender) {
            ui.Base.render.call(me, main);
            
            me._renderMain();
            me._refreshLine();
            me._bindEvent();
            me._isRender = 1;

            // 绘制宽高
            me.width && (main.style.width = me.width + 'px');
            me.height && (main.style.height = me.height + 'px');
        }
        
        if ( me._isRender ) {
            me._controlMap.text.setValue(me.value);
        }
    }