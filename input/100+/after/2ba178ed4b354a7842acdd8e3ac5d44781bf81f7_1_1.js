function(style, target)
    {
        var items = CSSStyleSheetPanel.prototype.getContextMenuItems.apply(this, [style, target]);
        var insertIndex = 0;

        for (var i = 0; i < items.length; ++i)
        {
            if (items[i].id == "fbNewCSSRule")
            {
                items.splice(i, 1);
                insertIndex = i;
                break;
            }
        }

        items.splice(insertIndex, 0, {
            label: "EditStyle",
            tooltiptext: "style.tip.Edit_Style",
            command: Obj.bindFixed(this.editElementStyle, this)
        },
        {
            label: "AddRule",
            tooltiptext: "style.tip.Add_Rule",
            command: Obj.bindFixed(this.addRelatedRule, this)
        });

        if (style instanceof Ci.nsIDOMFontFace && style.rule)
        {
            items.push(
                "-",
                {
                    label: "css.label.Inspect_Declaration",
                    tooltiptext: "css.tip.Inspect_Declaration",
                    id: "fbInspectDeclaration",
                    command: Obj.bindFixed(this.inspectDeclaration, this, style.rule)
                }
            );
        }

        return items;
    }