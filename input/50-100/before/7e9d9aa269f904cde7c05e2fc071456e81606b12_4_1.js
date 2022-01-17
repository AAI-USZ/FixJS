function () {
    osg.Object.call(this);

    this.children = [];
    this.parents = [];
    this.nodeMask = ~0;
    this.boundingSphere = new osg.BoundingSphere();
    this.boundingSphereComputed = false;
    this._updateCallbacks = [];
}