function (node) {
    var newNode, prop, props, i, child, children, type, zoneName, zoneIndex;

    if (!(node instanceof ADMNode)) {
        console.warn("Warning: invalid argument to copySubtree: ", node);
        return null;
    }

    type = node.getType();
    newNode = ADM.createNode(type, true);
    props = node.getProperties();
    for (prop in props) {
        if (node.isPropertyExplicit(prop) &&
            !BWidget.getPropertyAutoGenerate(type, prop)) {
            if (typeof props[prop] === 'object') {
                // do a deep copy of the property to avoid any cross-referencing
                newNode.setProperty(prop, $.extend(true, {}, props[prop]),
                                    undefined, true);
            } else {
                newNode.setProperty(prop, props[prop], undefined, true);
            }
        }
    }

    children = node.getChildren();
    for (i in children) {
        child = children[i];
        zoneName = child.getZone();
        zoneIndex = child.getZoneIndex();
        newNode.insertChildInZone(ADM.copySubtree(child), zoneName,
                                  zoneIndex);
    }

    return newNode;
}