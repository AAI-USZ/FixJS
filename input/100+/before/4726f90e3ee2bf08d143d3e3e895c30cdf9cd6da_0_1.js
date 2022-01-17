function(preExpr, expr, postExpr, range, cycle)
    {
        if (Dom.getAncestorByClass(this.target, "importRule"))
        {
            return [];
        }
        else if (Dom.getAncestorByClass(this.target, "cssCharsetRule"))
        {
            return Css.charsets;
        }
        else if (Css.hasClass(this.target, "cssPropName"))
        {
            var nodeType = Xml.getElementSimpleType(Firebug.getRepObject(this.target));
            return Css.getCSSPropertyNames(nodeType);
        }
        else
        {
            if (expr.charAt(0) === "!")
                return ["!important"];

            var row = Dom.getAncestorByClass(this.target, "cssProp");
            var propName = Dom.getChildByClass(row, "cssPropName").textContent;
            var nodeType = Xml.getElementSimpleType(Firebug.getRepObject(this.target));

            var keywords;
            if (range.type === "url")
            {
                // We can't complete urls yet.
                return [];
            }
            else if (range.type === "fontFamily")
            {
                keywords = Css.cssKeywords["fontFamily"].slice();
                if (this.panel && this.panel.context)
                {
                    // Add the fonts used in this context (they might be inaccessible
                    // for this element, but probably aren't).
                    var fonts = Fonts.getFontsUsedInContext(this.panel.context), ar = [];
                    for (var i = 0; i < fonts.length; i++)
                        ar.push(fonts[i].CSSFamilyName);
                    keywords = Arr.sortUnique(keywords.concat(ar));
                }

                var q = expr.charAt(0), isQuoted = (q === '"' || q === "'");
                if (!isQuoted)
                {
                    // Default to ' quotes, unless " occurs somewhere.
                    q = (/"/.test(preExpr + postExpr) ? '"' : "'");
                }

                // Don't complete '.
                if (expr.length <= 1 && isQuoted)
                    return [];

                // When completing, quote fonts if the input is quoted; when
                // cycling, quote them instead in the way the user seems to
                // expect to have them quoted.
                var reSimple = /^[a-z][a-z0-9-]*$/i;
                var isComplex = !reSimple.test(expr.replace(/^['"]?|['"]?$/g, ""));
                var quote = function(str)
                {
                    if (!cycle || isComplex !== isQuoted)
                        return (isQuoted ? q + str + q : str);
                    else
                        return (reSimple.test(str) ? str : q + str + q);
                };

                keywords = keywords.slice();
                for (var i = 0; i < keywords.length; ++i)
                {
                    // Treat values starting with capital letters as font names
                    // that can be quoted.
                    var k = keywords[i];
                    if (k.charAt(0).toLowerCase() !== k.charAt(0))
                        keywords[i] = quote(k);
                }
            }
            else
            {
                var lowerProp = propName.toLowerCase(), avoid;
                if (["background", "border", "font"].indexOf(lowerProp) !== -1)
                {
                    if (cycle)
                    {
                        // Cycle only within the same category, if possible.
                        var cat = Css.getCSSShorthandCategory(nodeType, lowerProp, expr);
                        if (cat)
                            return (cat in Css.cssKeywords ? Css.cssKeywords[cat] : [cat]);
                    }
                    else
                    {
                        // Avoid repeated properties. We assume the values to be solely
                        // space-separated tokens, within a comma-separated part (like
                        // for CSS3 multiple backgrounds). This is absolutely wrong, but
                        // good enough in practice because non-tokens for which it fails
                        // likely aren't in any category.
                        // "background-position" and "background-repeat" values can occur
                        // twice, so they are special-cased.
                        avoid = [];
                        var preTokens = preExpr.split(",").reverse()[0].split(" ");
                        var postTokens = postExpr.split(",")[0].split(" ");
                        var tokens = preTokens.concat(postTokens);
                        for (var i = 0; i < tokens.length; ++i)
                        {
                            var cat = Css.getCSSShorthandCategory(nodeType, lowerProp, tokens[i]);
                            if (cat && cat !== "position" && cat !== "bgRepeat")
                                avoid.push(cat);
                        }
                    }
                }
                keywords = Css.getCSSKeywordsByProperty(nodeType, propName, avoid);
            }

            // Don't complete minus signs into -moz-calc (issue 5603). (Unless we
            // have other specialized values as completions, like '-moz-available',
            // in which case completion is still interesting.)
            var isMoz = function(x)
            {
                return (x.charAt(0) === "-");
            };
            if (expr === "-" && keywords.filter(isMoz).join(",") === "-moz-calc()")
            {
                keywords = [];
            }

            // Add the magic inherit property, if it's sufficiently alone.
            if (!preExpr)
                keywords = keywords.concat(["inherit"]);

            return stripCompletedParens(keywords, postExpr);
        }
    }