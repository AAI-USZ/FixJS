function logText(text, row)
        {
            var node = row.ownerDocument.createTextNode(text);
            row.appendChild(node);
        }