function(event)
    {
        var image = this.getSelected();
        if (!image) return;

        // If this is not a Windows Instance, Disable the following context menu items.
        $("amis.context.migrate").disabled = !isWindows(image.platform);

        // These items apply only to AMIs
        fDisabled = !(image.id.match(regExs["ami"]));
        $("amis.context.register").disabled = fDisabled;
        $("amis.context.deregister").disabled = fDisabled;
        $("amis.context.launch").disabled = fDisabled;
        $("amis.context.delete").disabled = fDisabled;
        $("amis.context.perms").disabled = fDisabled || image.state == "deregistered";

        // These items don't apply to AMIs with root device type 'ebs'
        if (isEbsRootDeviceType(image.rootDeviceType)) {
            $("amis.context.delete").disabled = true;
            $("amis.context.deleteSnapshotAndDeregister").disabled = false;
        } else {
            $("amis.context.deleteSnapshotAndDeregister").disabled = true;
        }

        var type = $("ew.images.type").value;
        $("amis.context.fadd").disabled = type == "fav";
        $("amis.context.fdelete").disabled = type != "fav";
    }