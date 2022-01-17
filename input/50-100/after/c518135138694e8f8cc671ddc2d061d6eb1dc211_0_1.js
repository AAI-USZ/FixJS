function(elm, width, height){
            
            if(!width || !height)
                return;

            me.lastWidth = width;
            me.lastHeight = (!me.editor) ? me.inputEl.getHeight() : height;
            //me.lastHeight = height;
            
            if(!me.editor)
                me.initEditor();
            else
                me.setEditorSize(me.lastWidth, me.lastHeight);

          }