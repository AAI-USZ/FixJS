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
	    //me.tinymceConfig.height = me.inputEl.getHeight() - 2;
	    //console.log(me.inputEl, me.inputEl.getComputedHeight(), me.lastHeight);
	    me.tinymceConfig.height = me.lastHeight - 5;
	    //me.tinymceConfig.height = me.inputEl.getHeight() - 5;

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

                me.edToolbar = me.tableEl.down(".mceToolbar");
                me.edStatusbar = me.tableEl.down(".mceStatusbar");
                
                if(me.hideBorder)
                    me.tableEl.setStyle('border', '0px');
                    
                Ext.Function.defer(function(){
                
                    if(me.tableEl.getHeight() != me.lastHeight - 5)
                        me.setEditorSize(me.lastWidth, me.lastHeight);

                    //me.setEditorSize(me.lastWidth, (me.tableEl.getHeight() != me.lastHeight - 2) ? me.tableEl.getHeight() : me.lastHeight);
                }, 10, me);
 
                me.fireEvent('editorcreated', me.editor, me);
            });
        };
        
        tinymce.init(me.tinymceConfig);
    }