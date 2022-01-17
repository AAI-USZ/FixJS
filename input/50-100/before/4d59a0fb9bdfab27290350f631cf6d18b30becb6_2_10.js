function () {
    var that = this;
    komoo.event.addListener(this,'mousemove', function (e) {
        that.setOptions({strokeWeight: 2.5});
    });
    komoo.event.addListener(this, 'mouseout', function (e) {
        that.setOptions({strokeWeight: that.getBorderSize()});
    });
}