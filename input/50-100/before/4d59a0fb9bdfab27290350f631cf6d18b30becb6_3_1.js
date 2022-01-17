function (paths) {
    if (paths.length != this.polylines_.getLength()) {
        // FIXME: Use a constant as exception.
        throw "Invalid length.";
    }
    this.paths_.clear();
    for (var i=0; i<this.polylines_.getLength(); i++) {
        this.polyliness_.getAt(i).setPath(paths[i]);
        this.paths_.push(paths[i]);
    }
}