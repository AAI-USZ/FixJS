function (child, zoneName, zoneIndex,
                                             dryrun) {
    // requires: assumes cardinality is "N", or a numeric string
    var add = false, myType, childType, zone, cardinality, limit;
    myType = this.getType();
    childType = child.getType();
    zone = this._zones[zoneName];

    if (!BWidget.zoneAllowsChild(myType, zoneName, childType)) {
        if (!dryrun) {
            console.warn("Warning: zone " + zoneName +
                         " doesn't allow child type " + childType);
        }
        return false;
    }

    if (!BWidget.childAllowsParent(myType, childType)) {
        if (!dryrun) {
            console.warn("Warning: child type " + childType +
                         " doesn't allow parent type " + myType);
        }
        return false;
    }

    cardinality = BWidget.getZoneCardinality(myType, zoneName);
    if (!cardinality) {
        console.warn("Warning: no cardinality found for zone " + zoneName);
        return false;
    }

    if (cardinality !== "N") {
        limit = parseInt(cardinality, 10);
        if (zone.length >= limit) {
            // this zone is already full
            if (!dryrun) {
                console.warn("Warning: zone already full: " + zoneName);
            }
            return false;
        }
    }

    if (zoneIndex === undefined) {
        zoneIndex = zone.length;
    }
    return this.insertChildInZone(child, zoneName, zoneIndex, dryrun);
}