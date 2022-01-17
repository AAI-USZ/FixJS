function(treeNodeConfig, clickCallback, scope, overCallback, outCallback)
    {
        // NOTE: href:# fixes the bug where clicking / dbl-clicking on tree nodes reloads the app url (trip details node)
        var configDefaults = {href:"javascript:void(0);", margins: '0 0 0 0', cmargins: '0 2 0 0', expanded: true, collapsible: true};
        var config = Ext.apply({}, treeNodeConfig, configDefaults);
        var treeNode = new Ext.tree.TreeNode(config);
        this.setClickCallback(treeNode,     clickCallback, scope);
        this.setMouseOverCallback(treeNode, overCallback,  scope);
        this.setMouseOutCallback(treeNode,  outCallback,   scope);
        return treeNode;
    }