function()
    {
        if (!this.panelNode.getElementsByClassName("cssElementRuleContainer")[0])
        {
            // The element did not have any displayed styles - create the whole
            // tree and remove the no styles message.
            this.template.cascadedTag.replace({
                rules: [], inherited: [],
                inheritLabel: Locale.$STR("InheritedFrom")
            }, this.panelNode);
        }

        // Insert the new rule at the top, or after the style rules if there
        // are any.
        var container = this.panelNode.getElementsByClassName("cssNonInherited")[0];
        var ruleBox = container.getElementsByClassName("cssElementRuleContainer")[0];
        var styleRuleBox = ruleBox && Firebug.getElementByRepObject(ruleBox, this.selection);
        if (styleRuleBox)
            ruleBox = this.template.newRuleTag.insertAfter({}, ruleBox);
        else if (ruleBox)
            ruleBox = this.template.newRuleTag.insertBefore({}, ruleBox);
        else
            ruleBox = this.template.newRuleTag.append({}, container);

        var before = ruleBox.getElementsByClassName("insertBefore")[0];
        Firebug.Editor.insertRow(before, "before");

        // Auto-fill the selector field with something reasonable, like
        // ".some-class" or "#table td".
        var el = this.selection, doc = el.ownerDocument;
        var base = Xml.getNodeName(el), autofill;
        if (el.className)
        {
            autofill = "." + Arr.cloneArray(el.classList).join(".");
        }
        else
        {
            var level = 0;
            el = el.parentNode;
            while (!autofill && el !== doc)
            {
                ++level;
                if (el.id !== "")
                    autofill = "#" + el.id;
                else if (el.className !== "")
                    autofill = "." + Arr.cloneArray(el.classList).join(".");
                el = el.parentNode;
            }
            if (autofill)
            {
                if (level === 1)
                    autofill += " >";
                autofill += " " + base;
            }
        }
        if (!autofill ||
            doc.querySelectorAll(autofill).length === doc.querySelectorAll(base).length)
        {
            autofill = base;
        }
        this.ruleEditor.setValue(autofill);
        this.ruleEditor.input.select();
        Firebug.Editor.update(true);
    }