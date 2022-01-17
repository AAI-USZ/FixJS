function (e) {
            if ($(e.target).parents(".CodeMirror-gutter").length !== 0) {
                return;
            }
            
            // Note: on mousedown before this event, CodeMirror automatically checks mouse pos, and
            // if not clicking on a selection moves the cursor to click location. When triggered
            // from keyboard, no pre-processing occurs and the cursor/selection is left as is.
            
            var editor = EditorManager.getFocusedEditor(),
                inlineWidget = EditorManager.getFocusedInlineWidget();
            
            if (editor) {
                // If there's just an insertion point select the word token at the cursor pos so
                // it's more clear what the context menu applies to.
                if (!editor.hasSelection()) {
                    editor.selectWordAt(editor.getCursorPos());
                    
                    // Prevent menu from overlapping text by moving it down a little
                    // Temporarily backout this change for now to help mitigate issue #1111,
                    // which only happens if mouse is not over context menu. Better fix
                    // requires change to bootstrap, which is too risky for now.
                    //e.pageY += 6;
                }
                
                if (inlineWidget) {
                    inline_editor_cmenu.open(e);
                } else {
                    editor_cmenu.open(e);
                }
            }
        }