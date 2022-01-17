function()
    {
	    var me = this;
	    
	    if(me.inProgress)
	        return;
	    
	    me.inProgress = true;	    
	    
	 // Init values we do not want changed
	    me.tinymceConfig.elements = me.getInputId();
	    me.tinymceConfig.mode = 'exact';
	   
	    //me.tinymceConfig.width = me.lastWidth;
	    me.tinymceConfig.height = me.inputEl.getHeight() - 6;
	    
        me.tinymceConfig.setup = function(editor)
        { 
            editor.onInit.add(function(editor)
            {
                me.inProgress = false;
            });
            
            editor.onKeyPress.add(Ext.Function.createBuffered(me.validate, 250, me));

            editor.onPostRender.add(function(editor)
            {
                me.editor = editor;
                window.b = me.editor;

                editor.windowManager = new Ext.ux.form.field.TinyMCEWindowManager({
                    editor: me.editor
                });
                
                me.tableEl = Ext.get(me.editor.id + "_tbl");
                me.iframeEl = Ext.get(me.editor.id + "_ifr");

                if(!me.hideBorder)
                    me.tableEl.setStyle('border', '1px solid #ABC6DD');
                
                Ext.Function.defer(function(){
                    me.setEditorSize(me.lastWidth, me.lastHeight);
                }, 20, me);
                
                me.fireEvent('editorcreated', me.editor, me);
            });
        };
        
        tinymce.init(me.tinymceConfig);
    }