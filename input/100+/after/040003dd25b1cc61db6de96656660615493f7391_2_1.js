function (optZoom) {
    if (!this.getProperties()) return;
    var zoom = optZoom || this.map_ ? this.map_.getZoom() : 10;
    var url = '/static/img/';
    if (zoom >= this.minZoomMarker) {
        url += 'near';
    } else {
        url += 'far';
    }
    url += '/';
    if (this.isHighlighted()) {
        url += 'highlighted/';
    }

    if (this.getProperties().categories && this.getProperties().categories[0] &&
            zoom >= this.minZoomMarker)  {
        url += this.getProperties().categories[0].name.toLowerCase();
        if (this.getProperties().categories.length > 1) {
            url += '-plus';
        }
    } else {
        url += this.getProperties().type.toLowerCase();
    }
    url += '.png';
    url = url.replace(' ', '-');
    return url;
}