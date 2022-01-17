function createScene() {

    // override texture constructor to set the wrap mode repeat for all texture
    var previousTextureDefault = osg.Texture.prototype.setDefaultParameters;
    osg.Texture.prototype.setDefaultParameters = function() {
        previousTextureDefault.call(this);
        this.setWrapS('REPEAT');
        this.setWrapT('REPEAT');
        this.setMagFilter('LINEAR');
        this.setMinFilter('LINEAR_MIPMAP_LINEAR');
    };

    o = osgDB.parseSceneGraph(getPokerScene());
    return o;
}