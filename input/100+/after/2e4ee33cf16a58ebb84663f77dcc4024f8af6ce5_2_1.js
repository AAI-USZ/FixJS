function createScene() {
    var root = new osg.Node();
    // override texture constructor to set the wrap mode repeat for all texture
    var previousTextureDefault = osg.Texture.prototype.setDefaultParameters;
    osg.Texture.prototype.setDefaultParameters = function() {
        previousTextureDefault.call(this);
        this.setWrapS('REPEAT');
        this.setWrapT('REPEAT');
        this.setMagFilter('LINEAR');
        this.setMinFilter('LINEAR_MIPMAP_LINEAR');
    };

    osgDB.Promise.when(osgDB.parseSceneGraph(getPokerScene())).then(function (child) {
        root.addChild(child);
    });
    return root;
}