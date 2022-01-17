function(acl)
    {
        if (!acl) acl = ew_NetworkAclsTreeView.getSelected();
        if (!acl) return alert("Please, select ACL");
        var retVal = {ok:null};
        window.openDialog("chrome://ew/content/dialogs/create_networkaclentry.xul", null, "chrome,centerscreen,modal,resizable", acl, this.core, retVal);
        if (retVal.ok) {
            debug(JSON.stringify(retVal))
            this.core.api.createNetworkAclEntry(acl.id, retVal.num, retVal.proto, retVal.action, retVal.egress, retVal.cidr, retVal.var1, retVal.var2, function() {
                ew_NetworkAclsTreeView.refresh();
                ew_SubnetsTreeView.refresh();
            });
        }
    }