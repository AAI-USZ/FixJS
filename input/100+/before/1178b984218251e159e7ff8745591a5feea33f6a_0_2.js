function (child, dryrun) {
    var myType, childType, zones, redirect, widgets, wrapper, length, i;
    myType = this.getType();
    childType = child.getType();

    zones = BWidget.zonesForChild(myType, childType);
    if (zones.length === 0) {
        redirect = BWidget.getRedirect(myType);
        if (redirect) {
            widgets = this._zones[redirect.zone];
            if (widgets && widgets.length > 0) {
                if (widgets[0].addChild(child, dryrun)) {
                    return true;
                }
            } else {
                wrapper = ADM.createNode(redirect.type);
                if (wrapper.addChild(child, dryrun)) {
                    if (!this.addChildToZone(wrapper, redirect.zone, undefined,
                                             dryrun)) {
                        console.error("Unable to create redirect wrapper for " +
                                    myType);
                        return false;
                    } else {
                        return true;
                    }
                }
            }
        }

        console.warn("Warning: no zones found for child type");
        return false;
    }

    length = zones.length;
    for (i = 0; i < length; i++) {
        if (this.addChildToZone(child, zones[i], undefined, dryrun)) {
            return true;
        }
    }

    return false;
}