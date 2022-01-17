function(preExpr, expr, postExpr, range, cycle, context, out)
    {
        if (!Css.hasClass(this.target, "cssSelector"))
            return [];

        // Don't support attribute selectors, for now.
        if (preExpr.lastIndexOf('[') > preExpr.lastIndexOf(']'))
            return [];

        var includeTagNames = true;
        var includeIds = true;
        var includeClasses = true;
        var includePseudoClasses = true;
        var includePseudoElements = true;

        if (expr.length > 0)
        {
            includeTagNames = includeClasses = includeIds =
                includePseudoClasses = includePseudoElements = false;
            if (Str.hasPrefix(expr, "::"))
                includePseudoElements = true;
            else if (expr.charAt(0) === ":")
                includePseudoClasses = true;
            else if (expr.charAt(0) === "#")
                includeIds = true;
            else if (expr.charAt(0) === ".")
                includeClasses = true;
            else
                includeTagNames = true;
        }
        if (preExpr.length > 0 && reSelectorChar.test(preExpr.slice(-1)))
            includeTagNames = false;

        var ret = [];

        if (includeTagNames || includeIds || includeClasses)
        {
            // Traverse the DOM to get the used ids/classes/tag names that
            // are relevant as continuations.
            // (Tag names could be hard-coded, but finding which ones are
            // actually used hides annoying things like 'b'/'i' when they
            // are not used, and works in other contexts than HTML.)
            // This isn't actually that bad, performance-wise.
            var doc = context.window.document, els;
            if (preExpr && " >+~".indexOf(preExpr.slice(-1)) === -1)
            {
                try
                {
                    var preSelector = preExpr.split(",").reverse()[0];
                    els = doc.querySelectorAll(preSelector);
                }
                catch (exc)
                {
                    if (FBTrace.DBG_CSS)
                        FBTrace.sysout("Invalid previous selector part \"" + preSelector + "\"", exc);
                }
            }
            if (!els)
                els = doc.getElementsByTagName("*");
            els = [].slice.call(els);

            if (includeTagNames)
            {
                var tagMap = {};
                els.forEach(function(e)
                {
                    tagMap[e.localName] = 1;
                });
                ret.push.apply(ret, Object.keys(tagMap));
            }

            if (includeIds)
            {
                var ids = [];
                els.forEach(function(e)
                {
                    if (e.id)
                        ids.push(e.id);
                });
                ids = Arr.sortUnique(ids);
                ret.push.apply(ret, ids.map(function(cl)
                {
                    return "#" + cl;
                }));
            }

            if (includeClasses)
            {
                var clCombinationMap = {}, classes = [];
                els.forEach(function(e)
                {
                    var cl = e.className;
                    if (cl && !((","+cl) in clCombinationMap))
                    {
                        clCombinationMap[","+cl] = 1;
                        classes.push.apply(classes, e.classList);
                    }
                });
                classes = Arr.sortUnique(classes);
                ret.push.apply(ret, classes.map(function(cl)
                {
                    return "." + cl;
                }));
            }
        }

        if (includePseudoClasses)
        {
            // Add the pseudo-class-looking :before, :after.
            ret.push(
                ":after",
                ":before"
            );

            ret.push.apply(ret, Css.pseudoClasses);
        }

        if (includePseudoElements)
        {
            ret.push.apply(ret, Css.pseudoElements);
        }

        // Don't suggest things that are already included (by way of totally-
        // incorrect-but-probably-good-enough logic).
        var rev = Str.reverseString(preExpr);
        var partInd = rev.search(/[, >+~]/);
        var lastPart = (partInd === -1 ? rev : rev.substr(0, partInd));
        lastPart = Str.reverseString(lastPart);
        if (lastPart !== "")
        {
            ret = ret.filter(function(str)
            {
                var ind = lastPart.indexOf(str);
                if (ind === -1)
                    return true;
                var before = ind-1, after = ind+str.length;
                var re = reSelectorChar;
                if (before >= 0 && re.test(str.charAt(0)) && re.test(lastPart.charAt(before)))
                    return true;
                if (after < lastPart.length && re.test(lastPart.charAt(after)))
                    return true;
                return false;
            });
        }

        // Don't suggest internal Firebug things.
        var reInternal = /^[.#]firebug[A-Z]/;
        ret = ret.filter(function(str)
        {
            return !reInternal.test(str);
        });

        if (ret.indexOf(":hover") !== -1)
            out.suggestion = ":hover";

        return ret.sort();
    }