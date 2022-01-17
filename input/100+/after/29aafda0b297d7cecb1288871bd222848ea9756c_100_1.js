function toHTML(elt)
    {
        if (elt.nodeType == Node.ELEMENT_NODE)
        {
            if (Firebug.shouldIgnore(elt))
                return;

            var nodeName = getNodeName(elt);
            html.push('<', nodeName);

            for (var i = 0; i < elt.attributes.length; ++i)
            {
                var attr = elt.attributes[i];

                // Hide attributes set by Firebug
                if (Str.hasPrefix(attr.localName, "firebug-"))
                    continue;

                // MathML
                if (Str.hasPrefix(attr.localName, "-moz-math"))
                {
                    // just hide for now
                    continue;
                }

                html.push(' ', attr.name, '="', Str.escapeForElementAttribute(attr.value), '"');
            }

            if (elt.firstChild)
            {
                html.push('>');

                for (var child = elt.firstChild; child; child = child.nextSibling)
                    toHTML(child);

                html.push('</', nodeName, '>');
            }
            else if (isElementSVG(elt) || isElementMathML(elt))
            {
                html.push('/>');
            }
            else if (Xml.isSelfClosing(elt))
            {
                html.push((isElementXHTML(elt))?'/>':'>');
            }
            else
            {
                html.push('></', nodeName, '>');
            }
        }
        else if (elt.nodeType == Node.TEXT_NODE)
            html.push(Str.escapeForTextNode(elt.textContent));
        else if (elt.nodeType == Node.CDATA_SECTION_NODE)
            html.push('<![CDATA[', elt.nodeValue, ']]>');
        else if (elt.nodeType == Node.COMMENT_NODE)
            html.push('<!--', elt.nodeValue, '-->');
    }