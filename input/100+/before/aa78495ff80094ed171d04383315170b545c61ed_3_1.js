function()
    {
        if (!this._dirtyLines)
            return;

        // Check if the editor had been set readOnly by the moment when this async callback got executed.
        if (this._readOnly) {
            delete this._dirtyLines;
            return;
        }

        var dirtyLines = this._dirtyLines;

        var firstChunkNumber = this._chunkNumberForLine(dirtyLines.start);
        var startLine = this._textChunks[firstChunkNumber].startLine;
        var endLine = this._textModel.linesCount;

        // Collect lines.
        var firstLineRow;
        if (firstChunkNumber) {
            var chunk = this._textChunks[firstChunkNumber - 1];
            firstLineRow = chunk.expanded ? chunk.getExpandedLineRow(chunk.startLine + chunk.linesCount - 1) : chunk.element;
            firstLineRow = firstLineRow.nextSibling;
        } else
            firstLineRow = this._container.firstChild;

        var lines = [];
        for (var lineRow = firstLineRow; lineRow; lineRow = lineRow.nextSibling) {
            if (typeof lineRow.lineNumber === "number" && lineRow.lineNumber >= dirtyLines.end) {
                endLine = lineRow.lineNumber;
                break;
            }
            // Update with the newest lineNumber, so that the call to the _getSelection method below should work.
            lineRow.lineNumber = startLine + lines.length;
            this._collectLinesFromDiv(lines, lineRow);
        }

        // Try to decrease the range being replaced, if possible.
        var startOffset = 0;
        while (startLine < dirtyLines.start && startOffset < lines.length) {
            if (this._textModel.line(startLine) !== lines[startOffset])
                break;
            ++startOffset;
            ++startLine;
        }

        var endOffset = lines.length;
        while (endLine > dirtyLines.end && endOffset > startOffset) {
            if (this._textModel.line(endLine - 1) !== lines[endOffset - 1])
                break;
            --endOffset;
            --endLine;
        }

        lines = lines.slice(startOffset, endOffset);

        // Try to decrease the range being replaced by column offsets, if possible.
        var startColumn = 0;
        var endColumn = this._textModel.lineLength(endLine - 1);
        if (lines.length > 0) {
            var line1 = this._textModel.line(startLine);
            var line2 = lines[0];
            while (line1[startColumn] && line1[startColumn] === line2[startColumn])
                ++startColumn;
            lines[0] = line2.substring(startColumn);

            line1 = this._textModel.line(endLine - 1);
            line2 = lines[lines.length - 1];
            for (var i = 0; i < endColumn && i < line2.length; ++i) {
                if (startLine === endLine - 1 && endColumn - i <= startColumn)
                    break;
                if (line1[endColumn - i - 1] !== line2[line2.length - i - 1])
                    break;
            }
            if (i) {
                endColumn -= i;
                lines[lines.length - 1] = line2.substring(0, line2.length - i);
            }
        }

        var selection = this._getSelection();

        if (lines.length === 0 && endLine < this._textModel.linesCount)
            var oldRange = new WebInspector.TextRange(startLine, 0, endLine, 0);
        else if (lines.length === 0 && startLine > 0)
            var oldRange = new WebInspector.TextRange(startLine - 1, this._textModel.lineLength(startLine - 1), endLine - 1, this._textModel.lineLength(endLine - 1));
        else
            var oldRange = new WebInspector.TextRange(startLine, startColumn, endLine - 1, endColumn);

        var newContent = lines.join("\n");
        if (this._textModel.copyRange(oldRange) === newContent) {
            delete this._dirtyLines;
            return; // Noop
        }

        // This is a "foreign" call outside of this class. Should be before we delete the dirty lines flag.
        this._enterTextChangeMode();

        delete this._dirtyLines;

        var newRange = this._editRange(oldRange, newContent);

        this._paintScheduledLines(true);
        this._restoreSelection(selection);

        this._exitTextChangeMode(oldRange, newRange);
    }