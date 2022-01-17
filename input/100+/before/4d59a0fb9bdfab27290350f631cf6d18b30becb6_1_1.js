function (opt_object) {
    var that = this;
    var object = opt_object || this.getGeometry();
    var eventsNames = ['click', 'dblclick', 'mousedown', 'mousemove',
        'mouseout', 'mouseover', 'mouseup', 'rightclick',
        'drag', 'dragend', 'daggable_changed', 'dragstart',
        'coordinates_changed'];
    eventsNames.forEach(function(eventName, index, orig) {
        komoo.event.addListener(object, eventName, function (e, args) {
            komoo.event.trigger(that, eventName, e, args);
        });
    });
}