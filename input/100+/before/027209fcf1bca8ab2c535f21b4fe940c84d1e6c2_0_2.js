function (optZoom) {
    if (!this.getProperties()) return;
    var zoom = optZoom || 10;
    var url = "/static/img/";
    if (zoom >= 15) {
        url += "near";
    } else {
        url += "far";
    }
    url += "/";
    if (this.isHighlighted()) {
        url += "highlighted/";
    }

    if (this.getProperties().categories && this.getProperties().categories[0]) {
        url += this.getProperties().categories[0].name.toLowerCase();
        if (this.getProperties().categories.length > 1) {
            url += "-plus";
        }
    } else {
        url += this.getProperties().type;
    }
    url += ".png";
    return url;
}