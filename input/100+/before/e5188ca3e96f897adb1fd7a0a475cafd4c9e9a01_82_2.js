function(prefix)
    {
        var candidates = this.completionBase.candidates;
        var valid = [], ciValid = [];

        if (!this.completionBase.expr && !prefix)
        {
            // Don't complete "".
            this.completions = null;
            return;
        }

        var lowPrefix = prefix.toLowerCase();
        for (var i = 0; i < candidates.length; ++i)
        {
            // Mark a candidate as matching if it matches the prefix case-
            // insensitively, and shares its upper-case characters.
            var name = candidates[i];
            if (!Str.hasPrefix(name.toLowerCase(), lowPrefix))
                continue;

            var fail = false;
            for (var j = 0; j < prefix.length; ++j)
            {
                var ch = prefix.charAt(j);
                if (ch !== ch.toLowerCase() && ch !== name.charAt(j))
                {
                    fail = true;
                    break;
                }
            }
            if (!fail)
            {
                ciValid.push(name);
                if (Str.hasPrefix(name, prefix))
                    valid.push(name);
            }
        }

        if (ciValid.length > 0)
        {
            // If possible, default to a candidate matching the case by picking
            // a default from 'valid' and correcting its index.
            var hasMatchingCase = (valid.length > 0);

            this.completions = {
                list: (hasMatchingCase ? valid : ciValid),
                prefix: prefix
            };
            this.pickDefaultCandidate();

            if (hasMatchingCase)
            {
                var find = valid[this.completions.index];
                this.completions = {
                    list: ciValid,
                    prefix: prefix,
                    index: ciValid.indexOf(find)
                };
            }
        }
        else
        {
            this.completions = null;
        }
    }