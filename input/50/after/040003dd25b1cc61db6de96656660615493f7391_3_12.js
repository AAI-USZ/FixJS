function(eventName, index, orig) {
        google.maps.event.addListener(that.overlay_,
                eventName, function (e, args) {
            komoo.event.trigger(that, eventName, e, args);
        });
    }