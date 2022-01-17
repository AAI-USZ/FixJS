function(event)
    {
        var eni = this.getSelected();
        if (eni == null) return;
        var rc = { ok: false, title: "Update ENI, press OK to update ENI attributes" };
        for (var p in eni) {
            rc[p] = eni[p];
        }
        window.openDialog("chrome://ew/content/dialogs/edit_eni.xul", null, "chrome,centerscreen,modal,resizable", this.core, rc);
        if (rc.ok) {
            var me = this;
            if (eni.sourceDestCheck != rc.sourceDestCheck) {
                this.core.api.modifyNetworkInterfaceAttribute(eni.id, "SourceDestCheck", rc.SourceDestCheck, function() { me.refresh(); });
            }
            if (eni.descr != rc.descr) {
                this.core.api.modifyNetworkInterfaceAttribute(eni.id, "Description", rc.descr, function() { me.refresh(); });
            }
            if (eni.securityGroups.toString() != rc.securityGroups.toString()) {
                var attrs = [];
                for (var i in rc.securityGroups) {
                    attrs.push(['SecurityGroupId.' + (i + 1), rc.securityGroups[i]]);
                }
                this.core.api.modifyNetworkInterfaceAttributes(eni.id, attrs, function() { me.refresh(); });
            }
        }
    }