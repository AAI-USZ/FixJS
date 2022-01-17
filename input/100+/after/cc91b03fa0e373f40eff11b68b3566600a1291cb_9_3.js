function(prevCompletions)
    {
        var list = this.completions.list, ind;

        // If the typed expression is an extension of the previous completion, keep it.
        if (prevCompletions && Str.hasPrefix(this.completions.prefix, prevCompletions.prefix))
        {
            var lastCompletion = prevCompletions.list[prevCompletions.index];
            ind = list.indexOf(lastCompletion);
            if (ind !== -1)
                return ind;
        }

        // Special-case certain expressions.
        var special = {
            "": ["document", "console", "window", "parseInt", "undefined"],
            "window.": ["console"],
            "location.": ["href"],
            "document.": ["getElementById", "addEventListener", "createElement",
                "documentElement"]
        };
        if (special.hasOwnProperty(this.completionBase.expr))
        {
            var ar = special[this.completionBase.expr];
            for (var i = 0; i < ar.length; ++i)
            {
                var prop = ar[i];
                if (Str.hasPrefix(prop, this.completions.prefix))
                {
                    // Use 'prop' as a completion, if it exists.
                    ind = list.indexOf(prop);
                    if (ind !== -1)
                        return ind;
                }
            }
        }

        ind = 0;
        for (var i = 1; i < list.length; ++i)
        {
            if (list[i].length < list[ind].length)
                ind = i;
        }
        return ind;
    }