function(object, target)
    {
        if (FBTrace.DBG_DOM)
            FBTrace.sysout("dom.getContextMenuItems;", object);

        var row = Dom.getAncestorByClass(target, "memberRow");

        var items = [];

        if (row)
        {
            var rowName = getRowName(row);
            var rowObject = this.getRowObject(row);
            var rowValue = this.getRowPropertyValue(row);
            var member = row.domObject;

            var isWatch = Css.hasClass(row, "watchRow");
            var isStackFrame = rowObject instanceof StackFrame.StackFrame;
            var label, tooltiptext;

            items.push(
                "-",
                {
                    label: "Copy_Name",
                    tooltiptext: "dom.tip.Copy_Name",
                    command: Obj.bindFixed(this.copyName, this, row)
                },
                {
                    label: "Copy_Path",
                    tooltiptext: "dom.tip.Copy_Path",
                    command: Obj.bindFixed(this.copyPath, this, row)
                }
            );

            if (typeof(rowValue) == "string" || typeof(rowValue) == "number")
            {
                // Functions already have a copy item in their context menu
                items.push(
                    {
                        label: "CopyValue",
                        tooltiptext: "dom.tip.Copy_Value",
                        command: Obj.bindFixed(this.copyProperty, this, row)
                    }
                );
            }

            if (isWatch)
            {
                label = "EditWatch";
                tooltiptext = "watch.tip.Edit_Watch";
            }
            else if (isStackFrame)
            {
                label = "EditVariable";
                tooltiptext = "stack.tip.Edit_Variable";
            }
            else
            {
                label = "EditProperty";
                tooltiptext = "dom.tip.Edit_Property";
            }

            var readOnly = (!isWatch && !isStackFrame && member && member.readOnly);
            if (!readOnly)
            {
                items.push(
                    "-",
                    {
                        label: label,
                        tooltiptext: tooltiptext,
                        command: Obj.bindFixed(this.editProperty, this, row)
                    }
                );
            }

            if (isWatch || (!isStackFrame && !Dom.isDOMMember(rowObject, rowName)))
            {
                items.push(
                    {
                        label: isWatch ? "DeleteWatch" : "DeleteProperty",
                        tooltiptext: isWatch ? "watch.tip.Delete_Watch" :
                            "dom.tip.Delete_Property",
                        command: Obj.bindFixed(this.deleteProperty, this, row)
                    }
                );
            }

            if (!Dom.isDOMMember(rowObject, rowName) && member && member.breakable)
            {
                items.push(
                    "-",
                    {
                        label: "dom.label.breakOnPropertyChange",
                        tooltiptext: "dom.tip.Break_On_Property_Change",
                        type: "checkbox",
                        checked: this.context.dom.breakpoints.findBreakpoint(rowObject, rowName),
                        command: Obj.bindFixed(this.breakOnProperty, this, row)
                    }
                );
            }
        }

        items.push(
            "-",
            {
                label: "Refresh",
                tooltiptext: "panel.tip.Refresh",
                command: Obj.bindFixed(this.rebuild, this, true)
            }
        );

        return items;
    }