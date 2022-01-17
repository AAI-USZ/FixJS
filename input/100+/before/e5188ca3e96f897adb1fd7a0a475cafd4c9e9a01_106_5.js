function(style, target)
    {
        var items = [];

        if (target.nodeName == "TEXTAREA")
        {
            items = Firebug.BaseEditor.getContextMenuItems();
            items.push(
                "-",
                {
                    label: "Load_Original_Source",
                    tooltiptext: "css.tip.Load_Original_Source",
                    command: Obj.bindFixed(this.loadOriginalSource, this)
                }
            );
            return items;
        }

        if (Css.hasClass(target, "cssSelector"))
        {
            items.push(
                {
                    label: "Copy_Rule_Declaration",
                    tooltiptext: "css.tip.Copy_Rule_Declaration",
                    id: "fbCopyRuleDeclaration",
                    command: Obj.bindFixed(this.copyRuleDeclaration, this, target)
                },
                {
                    label: "Copy_Style_Declaration",
                    tooltiptext: "css.tip.Copy_Style_Declaration",
                    id: "fbCopyStyleDeclaration",
                    command: Obj.bindFixed(this.copyStyleDeclaration, this, target)
                }
            );
        }

        if (this.infoTipType == "color")
        {
            items.push(
                {
                    label: "CopyColor",
                    tooltiptext: "css.tip.Copy_Color",
                    command: Obj.bindFixed(System.copyToClipboard, System, this.infoTipObject)
                }
            );
        }
        else if (this.infoTipType == "image")
        {
            items.push(
                {
                    label: "CopyImageLocation",
                    tooltiptext: "css.tip.Copy_Image_Location",
                    command: Obj.bindFixed(System.copyToClipboard, System, this.infoTipObject)
                },
                {
                    label: "OpenImageInNewTab",
                    tooltiptext: "css.tip.Open_Image_In_New_Tab",
                    command: Obj.bindFixed(Win.openNewTab, Win, this.infoTipObject)
                }
            );
        }

        if (!Url.isSystemStyleSheet(this.selection))
        {
            items.push(
                "-",
                {
                    label: "NewRule",
                    tooltiptext: "css.tip.New_Rule",
                    id: "fbNewCSSRule",
                    command: Obj.bindFixed(this.insertRule, this, target)
                }
            );
        }

        if (Css.hasClass(target, "cssSelector"))
        {
            var selector = Str.cropString(target.textContent, 30);
            items.push(
                {
                    label: Locale.$STRF("css.Delete_Rule", [selector]),
                    tooltiptext: Locale.$STRF("css.tip.Delete_Rule", [selector]),
                    nol10n: true,
                    id: "fbDeleteRuleDeclaration",
                    command: Obj.bindFixed(this.deleteRuleDeclaration, this, target)
                }
            );
        }

        var cssRule = Dom.getAncestorByClass(target, "cssRule");
        if (cssRule)
        {
            if(Css.hasClass(cssRule, "cssEditableRule"))
            {
                items.push(
                    "-",
                    {
                        label: "NewProp",
                        tooltiptext: "css.tip.New_Prop",
                        id: "fbNewCSSProp",
                        command: Obj.bindFixed(this.insertPropertyRow, this, target)
                    }
                );
    
                var propRow = Dom.getAncestorByClass(target, "cssProp");
                if (propRow)
                {
                    var propName = Dom.getChildByClass(propRow, "cssPropName").textContent;
                    var isDisabled = Css.hasClass(propRow, "disabledStyle");
    
                    items.push(
                        {
                            label: Locale.$STRF("EditProp", [propName]),
                            tooltiptext: Locale.$STRF("css.tip.Edit_Prop", [propName]),
                            nol10n: true,
                            command: Obj.bindFixed(this.editPropertyRow, this, propRow)
                        },
                        {
                            label: Locale.$STRF("DeleteProp", [propName]),
                            tooltiptext: Locale.$STRF("css.tip.Delete_Prop", [propName]),
                            nol10n: true,
                            command: Obj.bindFixed(this.deletePropertyRow, this, propRow)
                        },
                        {
                            label: Locale.$STRF("DisableProp", [propName]),
                            tooltiptext: Locale.$STRF("css.tip.Disable_Prop", [propName]),
                            nol10n: true,
                            type: "checkbox",
                            checked: isDisabled,
                            command: Obj.bindFixed(this.disablePropertyRow, this, propRow)
                        }
                    );
                }
            }
    
            if (Css.hasClass(cssRule, "importRule"))
            {
                items.push(
                    {
                        label: "css.menu.Edit_Media_Query",
                        tooltiptext: "css.menu.tip.Edit_Media_Query",
                        id: "fbEditMediaQuery",
                        command: Obj.bindFixed(this.editMediaQuery, this, target)
                    }
                );
            }
        }

        items.push(
            "-",
            {
                label: "panel.Refresh",
                command: Obj.bind(this.refresh, this),
                tooltiptext: "panel.tip.Refresh"
            }
        );

        return items;
    }