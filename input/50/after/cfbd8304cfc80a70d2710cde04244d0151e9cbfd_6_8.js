function (vertexZ) {
        cc.Node.prototype.setVertexZ.call(this,vertexZ);
        this.SET_DIRTY_RECURSIVELY();
    }