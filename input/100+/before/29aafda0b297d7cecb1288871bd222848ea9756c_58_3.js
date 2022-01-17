function(objects, row, rep)
    {
        if (!objects || !objects.length)
            return;

        function logText(text, row)
        {
            var node = row.ownerDocument.createTextNode(text);
            row.appendChild(node);
        }

        var format = objects[0];
        var objIndex = 1;

        if (typeof(format) != "string")
        {
            format = "";
            objIndex = 0;
        }
        else  // a string
        {
            if (objects.length === 1) // then we have only a string...
            {
                if (format.length < 1) { // ...and it has no characters.
                    logText("(an empty string)", row);
                    return;
                }
            }
        }

        var parts = parseFormat(format);
        var trialIndex = objIndex;
        for (var i = 0; i < parts.length; i++)
        {
            var part = parts[i];
            if (part && typeof(part) == "object")
            {
                if (trialIndex++ >= objects.length)
                {
                    // Too few parameters for format, assume unformatted.
                    format = "";
                    objIndex = 0;
                    parts.length = 0;
                    break;
                }
            }
        }

        for (var i = 0; i < parts.length; ++i)
        {
            var part = parts[i];
            if (part && typeof(part) == "object")
            {
                var object = objects[objIndex++];
                if (part.type == "%c")
                    row.setAttribute("style", object.toString());
                else if (typeof(object) != "undefined")
                    this.appendObject(object, row, part.rep);
                else
                    this.appendObject(part.type, row, FirebugReps.Text);
            }
            else
            {
                FirebugReps.Text.tag.append({object: part}, row);
            }
        }

        for (var i = objIndex; i < objects.length; ++i)
        {
            logText(" ", row);
            var object = objects[i];
            if (typeof(object) == "string")
                FirebugReps.Text.tag.append({object: object}, row);
            else
                this.appendObject(object, row);
        }
    }