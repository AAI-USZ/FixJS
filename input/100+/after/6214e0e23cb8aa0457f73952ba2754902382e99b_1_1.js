function()
    {
        var me = this;

        if(me.sourceEl != null)
        {
            //me.sourceCode = Ext.get(me.sourceEl).getHTML();
            //me.sourceCode = Ext.get(me.sourceEl).dom.innerHTML; 
            me.sourceCode = Ext.get(me.sourceEl).dom.outerText; 
            //me.sourceCode = Ext.get(me.sourceEl).dom.value;
        }
        
        me.editorId = me.items.keys[0];
        me.oldSourceCode = me.sourceCode;
        
        me.callParent(arguments);

        // init editor on afterlayout
        me.on('afterlayout', function()
        {
            if(me.url)
            {
                Ext.Ajax.request({
                    url: me.url,
                    success: function(response)
                    {
                        me.sourceCode = response.responseText;
                        me.initEditor();
                    }
                });
            }
            else
            {
                me.initEditor();
            }
            
        }, me, {
            single: true
        });
    }