function()
    {
        // xxxHonza: Context menu support is going to change in SourceEditor
        this.editor.addEventListener(CONTEXT_MENU, this.onContextMenu);
        this.editor.addEventListener(TEXT_CHANGED, this.onTextChanged);

        this.editor.setCaretOffset(this.editor.getCharCount());

        Firebug.chrome.applyTextSize(Firebug.textSize);

        if (FBTrace.DBG_COMMANDEDITOR)
            FBTrace.sysout("commandEditor.onEditorLoad; SourceEditor loaded");
    }