function(target, value, previousValue)
    {
        var node = Firebug.getRepObject(target);
        if (!node)
            return;

        value = Str.unescapeForTextNode(value || "");
        target.innerHTML = Str.escapeForTextNode(value);

        if (node instanceof window.Element)
        {
            if (Xml.isElementMathML(node) || Xml.isElementSVG(node))
                node.textContent = value;
            else
                node.innerHTML = value;
        }
        else
        {
            try
            {
                var documentFragment = this.range.createContextualFragment(value);
                var cnl = documentFragment.childNodes.length;
                this.range.deleteContents();
                this.range.insertNode(documentFragment);
                var r = this.range, sc = r.startContainer, so = r.startOffset;
                this.range.setEnd(sc,so+cnl);
            }
            catch (e)
            {
                if (FBTrace.DBG_ERRORS)
                    FBTrace.sysout("htmlPanel.saveEdit; EXCEPTION " + e, e);
            }
        }
    }