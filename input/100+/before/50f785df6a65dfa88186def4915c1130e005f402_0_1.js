function()
    {
        try
        {
            // This event is not supported in Fx11, so catch the exception
            // which is thrown.
            this.editor.addEventListener("keypress", this.onKeyPress);
        }
        catch (err)
        {
            if (FBTrace.DBG_ERROR)
                FBTrace.sysout("commandEditor.onEditorLoad; EXCEPTION " + err, err);
        }

        // xxxHonza: Context menu support is going to change in SourceEditor
        this.editor.addEventListener(CONTEXT_MENU, this.onContextMenu);
        this.editor.addEventListener(TEXT_CHANGED, this.onTextChanged);

        this.editor.setCaretOffset(this.editor.getCharCount());

        Firebug.chrome.applyTextSize(Firebug.textSize);

        if (FBTrace.DBG_COMMANDEDITOR)
            FBTrace.sysout("commandEditor.onEditorLoad; SourceEditor loaded");
    }