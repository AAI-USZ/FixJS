function(confirmed)
    {
        var me = this;
        var image = this.getSelected();
        if (!image) return;
        if (!confirmed && !confirm("Deregister AMI " + image.id + " (" + image.location + ")?")) return;
        this.core.api.deregisterImage(image.id, function() {me.refresh()});
    }