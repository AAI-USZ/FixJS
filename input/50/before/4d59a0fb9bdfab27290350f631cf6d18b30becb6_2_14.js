function () {
    return this.feature_ ? this.feature_.getBorderColor() :
        komoo.geometries.defaults.BORDER_COLOR;
}