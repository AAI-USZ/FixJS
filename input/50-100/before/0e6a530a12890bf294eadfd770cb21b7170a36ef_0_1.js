function()
    {
        if (!this.editor)
            return;

        try
        {
            this.editor.removeEventListener("keypress", this.onKeyPress);
        }
        catch (err)
        {
        }

        this.editor.removeEventListener(CONTEXT_MENU, this.onContextMenu);
        this.editor.removeEventListener(TEXT_CHANGED, this.onTextChanged);

        this.editor.destroy();
        this.editor = null;
    }