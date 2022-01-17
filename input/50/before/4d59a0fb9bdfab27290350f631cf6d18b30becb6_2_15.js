function () {
    return this.feature_ ? this.feature_.getBorderOpacity() :
        komoo.geometries.defaults.BORDER_OPACITY;
}