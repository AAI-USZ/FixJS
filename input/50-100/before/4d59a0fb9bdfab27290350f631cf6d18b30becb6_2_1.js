function () {
    var that = this;
    var eventsNames = ['click', 'dblclick', 'mousedown', 'mousemove',
        'mouseout', 'mouseover', 'mouseup', 'rightclick'];
    eventsNames.forEach(function(eventName, index, orig) {
        google.maps.event.addListener(that.overlay_,
                eventName, function (e, args) {
            komoo.event.trigger(that, eventName, e, args);
        });
    });
}