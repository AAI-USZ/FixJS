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