function(objects, row, rep)
    {
        function logText(text, row)
        {
            Css.setClass(row, "logRowHint");
            var node = row.ownerDocument.createTextNode(text);
            row.appendChild(node);
        }

        function logTextNode(text, row)
        {
            var nodeSpan = row.ownerDocument.createElement("span");
            if (text === "" || text === null || typeof(text) == "undefined")
                Css.setClass(nodeSpan, "logRowHint");

            if (text === "")
                text = Locale.$STR("console.msg.an_empty_string");

            var node = row.ownerDocument.createTextNode(text);
            row.appendChild(nodeSpan);
            nodeSpan.appendChild(node);
        }

        if (!objects || !objects.length)
        {
            // Make sure the log-row has proper height (even if empty).
            logText(Locale.$STR("console.msg.nothing_to_output"), row);
            return;
        }

        var format = objects[0];
        var objIndex = 1;

        if (typeof(format) != "string")
        {
            format = "";
            objIndex = 0;
        }
        else
        {
            // So, we have only a string...
            if (objects.length === 1)
            {
                // ...and it has no characters.
                if (format.length < 1)
                {
                    logText(Locale.$STR("console.msg.an_empty_string"), row);
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
            logTextNode(" ", row);

            var object = objects[i];
            if (typeof(object) == "string")
                logTextNode(object, row);
            else
                this.appendObject(object, row);
        }
    }