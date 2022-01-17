function(editor)
            {
                me.editor = editor;
                window.b = me.editor;
                //me.on('resize', me.onResize, me);
                //tinymce.add(me.editor);

                editor.windowManager = Ext.create("UX.tinymce.WindowManager", {
                    editor: me.editor
                });
                
                me.tableEl = Ext.get(me.editor.id + "_tbl");
                me.iframeEl = Ext.get(me.editor.id + "_ifr");
                
                me.fireEvent('editorcreated', me.editor, me);
            }