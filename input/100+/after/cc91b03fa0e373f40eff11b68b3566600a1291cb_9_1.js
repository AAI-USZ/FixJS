function(context)
    {
        var offset = this.textBox.selectionStart;
        if (offset !== this.textBox.value.length)
        {
            this.hide();
            return;
        }

        var value = this.textBox.value;

        // Create a simplified expression by redacting contents/normalizing
        // delimiters of strings and regexes, to make parsing easier.
        // Give up if the syntax is too weird.
        var svalue = simplifyExpr(value);
        if (svalue === null)
        {
            this.hide();
            return;
        }

        if (killCompletions(svalue, value))
        {
            this.hide();
            return;
        }

        // Find the expression to be completed.
        var parseStart = getExpressionOffset(svalue);
        var parsed = value.substr(parseStart);
        var sparsed = svalue.substr(parseStart);

        // Find which part of it represents the property access.
        var propertyStart = getPropertyOffset(sparsed);
        var prop = parsed.substring(propertyStart);
        var spreExpr = sparsed.substr(0, propertyStart);
        var preExpr = parsed.substr(0, propertyStart);

        this.completionBase.pre = value.substr(0, parseStart);

        if (FBTrace.DBG_COMMANDLINE)
        {
            var sep = (parsed.indexOf("|") > -1) ? "^" : "|";
            FBTrace.sysout("Completing: " + this.completionBase.pre + sep + preExpr + sep + prop);
        }

        var prevCompletions = this.completions;

        // We only need to calculate a new candidate list if the expression has
        // changed (we can ignore this.completionBase.pre since completions do not
        // depend upon that).
        if (preExpr !== this.completionBase.expr)
        {
            this.completionBase.expr = preExpr;
            this.completionBase.candidates = autoCompleteEval(context, preExpr, spreExpr,
                this.options.includeCurrentScope);
            prevCompletions = null;
        }

        this.createCompletions(prop, prevCompletions);
    }