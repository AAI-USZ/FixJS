function(caseSensitive, getRange, evaluator, getNewPropSeparator)
{
    var candidates = null;
    var suggestedDefault = null;
    var lastValue = "";
    var originalOffset = -1;
    var originalValue = null;
    var lastExpr = null;
    var lastOffset = -1;
    var exprOffset = 0;
    var lastIndex = null;
    var preExpr = null;
    var postExpr = null;

    this.revert = function(textBox)
    {
        if (originalOffset != -1)
        {
            textBox.value = lastValue = originalValue;
            textBox.setSelectionRange(originalOffset, originalOffset);

            this.reset();
            return true;
        }
        else
        {
            this.reset();
            return false;
        }
    };

    this.reset = function()
    {
        candidates = null;
        suggestedDefault = null;
        originalOffset = -1;
        originalValue = null;
        lastExpr = null;
        lastOffset = 0;
        exprOffset = 0;
        lastIndex = null;
    };

    this.complete = function(context, textBox, cycle)
    {
        if (!textBox.value && !cycle)
        {
            // Don't complete an empty field.
            return false;
        }

        var offset = textBox.selectionStart; // defines the cursor position

        var found = this.pickCandidates(textBox, context, cycle);

        if (!found)
            this.reset();

        return found;
    };

    /**
     * returns true if candidate list was created
     */
    this.pickCandidates = function(textBox, context, cycle)
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
    };

    this.setCandidatesByExpr = function(expr, values)
    {
        // Filter the list of values to those which begin with expr. We
        // will then go on to complete the first value in the resulting list.
        candidates = [];

        var findExpr = (caseSensitive ? expr : expr.toLowerCase());
        for (var i = 0; i < values.length; ++i)
        {
            var name = values[i];
            var testName = (caseSensitive ? name : name.toLowerCase());

            if (Str.hasPrefix(testName, findExpr))
                candidates.push(name);
        }

        lastIndex = null;
    };

    this.setCandidatesBySearchExpr = function(expr, values)
    {
        var searchIndex = -1;

        var findExpr = (caseSensitive ? expr : expr.toLowerCase());

        // Find the first instance of expr in the values list. We
        // will then complete the string that is found.
        for (var i = 0; i < values.length; ++i)
        {
            var name = values[i];
            if (!caseSensitive)
                name = name.toLowerCase();

            if (Str.hasPrefix(name, findExpr))
            {
                searchIndex = i;
                break;
            }
        }

        if (searchIndex == -1)
        {
            // Nothing found, so there's nothing to complete to
            candidates = [];
            return;
        }

        candidates = Arr.cloneArray(values);
        lastIndex = searchIndex;
    };

    this.adjustLastIndex = function(cycle)
    {
        if (!cycle)
        {
            // We have a valid lastIndex but we are not cycling, so reset it
            lastIndex = this.pickDefaultCandidate();
        }
        else if (lastIndex === null)
        {
            // There is no old lastIndex, so use the default
            lastIndex = this.pickDefaultCandidate();
        }
        else
        {
            // cycle
            lastIndex += cycle;
            if (lastIndex >= candidates.length)
                lastIndex = 0;
            else if (lastIndex < 0)
                lastIndex = candidates.length - 1;
        }
    };

    this.convertCompletionCase = function(completion, userTyped)
    {
        var preCompletion = completion.substr(0, userTyped.length);
        if (preCompletion === userTyped)
        {
            // Trust the completion to be correct.
            return completion;
        }
        else
        {
            // If the typed string is entirely in one case, use that.
            if (userTyped === userTyped.toLowerCase())
                return completion.toLowerCase();
            if (userTyped === userTyped.toUpperCase())
                return completion.toUpperCase();

            // The typed string mixes case in some odd way; use the rest of
            // the completion as-is.
            return userTyped + completion.substr(userTyped.length);
        }
    };

    this.pickDefaultCandidate = function()
    {
        // If we have a suggestion and it's in the candidate list, use that
        if (suggestedDefault)
        {
            var ind = candidates.indexOf(suggestedDefault);
            if (ind !== -1)
                return ind;
        }

        var userTyped = lastExpr.substr(0, lastOffset-exprOffset);
        var utLen = userTyped.length;

        // Otherwise, default to the shortest candidate that matches the case,
        // or the shortest one that doesn't
        var pick = -1, pcand, pcaseState;
        for (var i = 0; i < candidates.length; i++)
        {
            var cand = candidates[i];
            var caseState = (cand.substr(0, utLen) === userTyped ? 1 : 0);
            if (pick === -1 ||
                caseState > pcaseState ||
                (caseState === pcaseState && cand.length < pcand.length))
            {
                pick = i;
                pcand = cand;
                pcaseState = caseState;
            }
        }
        return pick;
    };
}