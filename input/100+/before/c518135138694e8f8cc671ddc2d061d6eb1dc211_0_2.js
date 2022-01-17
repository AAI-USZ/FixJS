function(editor)
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
            }