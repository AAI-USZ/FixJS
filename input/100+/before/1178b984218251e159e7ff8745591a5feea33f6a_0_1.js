function (parentRef, childRef, dryrun) {
    var parent, child;

    parent = ADM.toNode(parentRef);
    if (!parent) {
        console.warn("Warning: invalid parent while adding child: ", parentRef);
        return null;
    }

    if (typeof childRef === "string") {
        child = ADM.createNode(childRef);
    }
    else {
        child = childRef;
    }

    if (!child) {
        console.warn("Warning: invalid widget while adding child: ", childRef);
        return null;
    }

    if (parent.addChild(child, dryrun)) {
        if (dryrun) {
            return true;
        }
        // use getParent below in case the child was redirected to another
        // node (as in the case of Page/Content)
        ADM.transaction({
            type: "add",
            parent: child.getParent(),
            child: child
        });
        return child;
    }

    console.warn("Warning: failed to add child: ", childRef, parent, child);
    return null;
}