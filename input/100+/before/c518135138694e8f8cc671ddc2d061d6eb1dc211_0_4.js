function(width, height)
    {
        var me = this;
        
        if(!me.editor || !me.rendered)
            return;
  
        var edToolbar = me.tableEl.down(".mceToolbar");
        var edStatusbar = me.tableEl.down(".mceStatusbar");
        
        var frameHeight = height - 2;
        
        if(edToolbar) frameHeight -= edToolbar.getHeight();
        if(edStatusbar) frameHeight -= edStatusbar.getHeight();
        
        me.iframeEl.setHeight(frameHeight);
        
        //me.tableEl.setWidth(width);
        me.tableEl.setHeight(height);
        me.inputEl.setHeight(height);
    }