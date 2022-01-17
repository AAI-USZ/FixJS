function () {
    komoo.geometries.Geometry.prototype.initEvents.call(this);
    var that = this;
    var eventsNames = ['animation_changed', 'clickable_changed',
        'cursor_changed', 'drag', 'dragend', 'daggable_changed', 'dragstart',
        'flat_changed', 'icon_changed', 'position_changed', 'shadow_changed',
        'shape_changed', 'title_changed', 'visible_changed', 'zindex_changed'];
    eventsNames.forEach(function(eventName, index, orig) {
        google.maps.event.addListener(that.overlay_,
                eventName, function (e, args) {
            komoo.event.trigger(that, eventName, e, args);
        });
    });
}