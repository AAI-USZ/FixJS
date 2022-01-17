function (args) {
    this.updateIcon();
    komoo.event.trigger(this, 'coordinates_changed', args);
}