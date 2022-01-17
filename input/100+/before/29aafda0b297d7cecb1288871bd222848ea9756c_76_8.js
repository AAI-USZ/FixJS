function(value, amt, offset, offsetEnd)
    {
        var propName = null;
        if (Css.hasClass(this.target, "cssPropValue"))
        {
            var propRow = Dom.getAncestorByClass(this.target, "cssProp");
            propName = Dom.getChildByClass(propRow, "cssPropName").textContent;
        }

        var range = CSSModule.parseCSSValue(value, offset);
        var type = (range && range.type) || "";
        var expr = (range ? value.substring(range.start, range.end) : "");

        var completion = null, selection, info;
        if (type === "int")
        {
            if (propName === "opacity")
            {
                info = {minValue: 0, maxValue: 1};
                amt /= 100;
            }

            if (expr === "0" && value.lastIndexOf("(", offset) === -1 &&
                !Css.unitlessProperties.hasOwnProperty(propName))
            {
                // 0 is a length, and incrementing it normally will result in an
                // invalid value 1 or -1.  Thus, guess at a unit to add.
                var unitM = /\d([a-z]{1,4})/.exec(value);
                expr += (unitM ? unitM[1] : "px");
            }

            var newValue = this.incrementExpr(expr, amt, info);
            if (newValue !== null)
            {
                completion = newValue;
                selection = [0, completion.length];
            }
        }
        else if (type === "rgb" && expr.charAt(0) === "#")
        {
            var offsetIntoExpr = offset - range.start;
            var offsetEndIntoExpr = offsetEnd - range.start;

            // Increment a hex color.
            var res = this.incrementHexColor(expr, amt, offsetIntoExpr, offsetEndIntoExpr);
            if (res)
            {
                completion = res.value;
                selection = res.selection;
            }
        }
        else
        {
            if (type === "rgb" || type === "hsl")
            {
                info = {};
                var part = value.substring(range.start, offset).split(",").length - 1;
                if (part === 3) // alpha
                {
                    info.minValue = 0;
                    info.maxValue = 1;
                    amt /= 100;
                }
                else if (type === "rgb") // rgb color
                {
                    info.minValue = 0;
                    info.maxValue = 255;
                    if (Math.abs(amt) < 1)
                        amt = (amt < 0 ? -1 : 1);
                }
                else if (part !== 0) // hsl percentage
                {
                    info.minValue = 0;
                    info.maxValue = 100;

                    // If the selection is at the end of a percentage sign, select
                    // the previous number. This would have been less hacky if
                    // parseCSSValue parsed functions recursively.
                    if (value.charAt(offset-1) === "%")
                        --offset;
                }
            }

            return Firebug.InlineEditor.prototype.doIncrementValue
                .call(this, value, amt, offset, offsetEnd, info);
        }

        if (completion === null)
            return;

        var preExpr = value.substr(0, range.start);
        var postExpr = value.substr(range.end);

        return {
            value: preExpr + completion + postExpr,
            start: range.start + selection[0],
            end: range.start + selection[1]
        };
    }