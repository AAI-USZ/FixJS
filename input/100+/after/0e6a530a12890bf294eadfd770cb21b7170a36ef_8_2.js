function(popup)
    {
        Dom.eraseNode(popup);

        var editors = this.getRegisteredEditors();
        for (var i=0; i<editors.length; ++i)
        {
            if (editors[i] == "-")
            {
                Menu.createMenuItem(popup, "-");
                continue;
            }

            var item = {
                label: editors[i].label,
                image: editors[i].image,
                nol10n: true
            };

            var menuitem = Menu.createMenuItem(popup, item);
            menuitem.value = editors[i].id;
        }

        if (editors.length > 0)
            Menu.createMenuItem(popup, "-");

        Menu.createMenuItem(popup, {
            label: Locale.$STR("firebug.Configure_Editors") + "...",
            nol10n: true,
            option: "openEditorList"
        });
    }