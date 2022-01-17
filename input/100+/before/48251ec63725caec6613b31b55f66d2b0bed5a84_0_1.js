function (menu, clickednode) {

    var newgroup,
        groups,
        numberofgroups,
        iscontextmenu = menu instanceof YAHOO.widget.ContextMenu;

    groups = clickednode.get_groups();
    numberofgroups = groups.length;

    for (var i = 0; i < numberofgroups; i++) {

        newgroup = {
            "text" : groups[i].name,
            "value" : { "groupid" : groups[i].id},
            "onclick" : { fn : M.block_ajax_marking.contextmenu_setting_onclick,
                          obj : {'settingtype' : 'group'} } };

        // Make sure the items' appearance reflect their current settings
        // JSON seems to like sending back integers as strings

        if (groups[i].display === "1") {
            // Make sure it is checked
            newgroup.checked = true;

        } else if (groups[i].display === "0") {
            newgroup.checked = false;

        } else if (groups[i].display === null) {
            // We want to show that this node inherits it's setting for this group
            // newgroup.classname = 'inherited';
            // Now we need to get the right default for it and show it as checked or not
            groupdefault = clickednode.get_default_setting('group', groups[i].id);
            newgroup.checked = groupdefault ? true : false;
            if (M.block_ajax_marking.showinheritance) {
                newgroup.classname = 'inherited';
            }
        }

        // Add to group 1 so we can keep it separate from group 0 with the basic settings so that
        // the contextmenu will have these all grouped to gether with a title
        var groupindex = iscontextmenu ? 1 :0;
        menu.addItem(newgroup, groupindex);
    }

    // If there are no groups, we want to show this rather than have the context menu fail to
    // pop up at all, leaving the normal one to appear in it's place
    if (numberofgroups === 0) {
        // TODO probably don't need this now - never used?
        menu.addItem({"text" : M.str.block_ajax_marking.nogroups,
                         "value" : 0 });
    } else if (iscontextmenu) {
        menu.setItemGroupTitle(M.str.block_ajax_marking.choosegroups+':', 1);
    }
}