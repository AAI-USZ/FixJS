function (kmlObject, beforeAddCallback) {
    if (kmlObject) {
        console.log("loaded " + this);
        // check if the KML is still needed
        var doContinue = true;
        if (beforeAddCallback !== undefined) {
            doContinue = beforeAddCallback();
        }
        if (doContinue) { 
            // add new features
            this.kmlObject = kmlObject;
            ge.getFeatures().appendChild(kmlObject);
        }
        else {
            console.log("load canceled");
        }
    }
    else {
        console.log("failed to load " + this);
    }
    kvu.setNodeLoading(this.id, false);
}