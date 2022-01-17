function () {
    return this.feature_ ? this.feature_.getDefaultZIndex() :
        komoo.geometries.defaults.ZINDEX;
}