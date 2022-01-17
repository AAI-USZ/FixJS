function logText(text, row)
        {
            Css.setClass(row, "logRowHint");
            var node = row.ownerDocument.createTextNode(text);
            row.appendChild(node);
        }