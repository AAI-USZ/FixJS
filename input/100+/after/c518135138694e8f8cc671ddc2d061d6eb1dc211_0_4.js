function(width, height)
    {
        var me = this,
            frameHeight = height - 2;
        
        if(!me.editor || !me.rendered)
            return;
        
        if(me.edToolbar)
            frameHeight -= me.edToolbar.getHeight();
        
        if(me.edStatusbar)
            frameHeight -= me.edStatusbar.getHeight();
        
        //console.log(me.edToolbar);
        me.iframeEl.setHeight(frameHeight);
        
        //me.tableEl.setWidth(width);
        me.tableEl.setHeight(height);
        me.inputEl.setHeight(height);
    }