function (mode, indices) {
    this.mode = osg.PrimitiveSet.POINTS;
    if (mode !== undefined) {
        this.mode = mode;
    }

    this.count = 0;
    this.offset = 0;
    this.indices = indices;
    if (indices !== undefined) {
        this.setIndices(indices);
    }
}