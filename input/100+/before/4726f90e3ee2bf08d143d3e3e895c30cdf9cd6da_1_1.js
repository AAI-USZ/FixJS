function(textBox, context, cycle)
    {
        var value = textBox.value;
        var offset = textBox.selectionStart;

        if (!candidates || !cycle || value != lastValue || offset != lastOffset)
        {
            originalOffset = lastOffset = offset;
            originalValue = lastValue = value;

            // Find the part of the string that is being completed
            var range = getRange(value, lastOffset);
            if (!range)
                range = {start: 0, end: value.length};

            preExpr = value.substr(0, range.start);
            lastExpr = value.substring(range.start, range.end);
            postExpr = value.substr(range.end);
            exprOffset = range.start;

            if (FBTrace.DBG_EDITOR)
            {
                var sep = (value.indexOf("|") > -1) ? "^" : "|";
                FBTrace.sysout(preExpr+sep+lastExpr+sep+postExpr + " offset: " + lastOffset);
            }

            var search = false;

            // Check if the cursor is somewhere in the middle of the expression
            if (lastExpr && offset != range.end)
            {
                if (cycle)
                {
                    // Complete by resetting the completion list to a more complete
                    // list of candidates, finding our current position in it, and
                    // cycling from there.
                    search = true;
                    lastOffset = range.start;
                }
                else if (offset != range.start+1)
                {
                    // Nothing new started, just fail.
                    return false;
                }
                else
                {
                    // Try to parse the typed character as the start of a new
                    // property, moving the rest of lastExpr over into postExpr
                    // (possibly with a separator added). If there is no support
                    // for prefix-completions, fail.
                    // Note that this does not show unless there is a completion.
                    var moveOver = lastExpr.substr(1);
                    lastExpr = lastExpr.charAt(0);

                    var sep = getNewPropSeparator(range, lastExpr, moveOver);
                    if (sep === null)
                        return false;
                    if (!Str.hasPrefix(moveOver, sep))
                        moveOver = sep + moveOver;

                    postExpr = moveOver + postExpr;
                    range.end = range.start;
                    range.start = offset;
                }
            }

            // Don't complete globals unless cycling.
            if (!cycle && !lastExpr)
                return false;

            var out = {};
            var values = evaluator(preExpr, lastExpr, postExpr, range, search, context, out);
            suggestedDefault = out.suggestion || null;

            if (search)
                this.setCandidatesBySearchExpr(lastExpr, values);
            else
                this.setCandidatesByExpr(lastExpr, values);
        }

        if (!candidates.length)
            return false;

        this.adjustLastIndex(cycle);
        var completion = candidates[lastIndex];

        // Adjust the case of the completion - when editing colors, 'd' should
        // be completed into 'darkred', not 'darkRed'.
        var userTyped = lastExpr.substr(0, lastOffset-exprOffset);
        completion = this.convertCompletionCase(completion, userTyped);

        var line = preExpr + completion + postExpr;
        var offsetEnd = exprOffset + completion.length;

        // Show the completion
        lastValue = textBox.value = line;
        textBox.setSelectionRange(lastOffset, offsetEnd);

        return true;
    }