function(adjust)
    {
        if (!this.editor || !this.editor._view)
            return;

        if (typeof(SourceEditor) != "undefined")
        {
            var doc = this.editor._view._frame.contentDocument;

            // See issue 5488
            //doc.body.style.fontSizeAdjust = adjust;
        }
        else
        {
            this.editor.textBox.style.fontSizeAdjust = adjust;
        }
    }