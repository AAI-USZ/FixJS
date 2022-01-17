function()
    {
        if (this._dirtyLines)
            return false;

        var range = this._getSelection();
        if (!range)
            return false;

        range.normalize();

        if (range.endColumn === 0)
            return false;

        var line = this._textModel.line(range.startLine);
        var linePrefix = line.substring(0, range.startColumn);
        var indentMatch = linePrefix.match(/^\s+/);
        var currentIndent = indentMatch ? indentMatch[0] : "";

        var textEditorIndent = WebInspector.settings.textEditorIndent.get();
        var indent = WebInspector.TextEditorModel.endsWithBracketRegex.test(linePrefix) ? currentIndent + textEditorIndent : currentIndent;

        if (!indent)
            return false;

        this.beginUpdates();
        this._enterTextChangeMode();

        var lineBreak = this._textModel.lineBreak;
        var newRange;
        if (range.isEmpty() && line.substr(range.endColumn - 1, 2) === '{}') {
            // {|}
            // becomes
            // {
            //     |
            // }
            newRange = this._editRange(range, lineBreak + indent + lineBreak + currentIndent);
            newRange.endLine--;
            newRange.endColumn += textEditorIndent.length;
        } else
            newRange = this._editRange(range, lineBreak + indent);

        this._exitTextChangeMode(range, newRange);
        this.endUpdates();
        this._restoreSelection(newRange.collapseToEnd(), true);

        return true;
    }