function(eventName, index, orig) {
        google.maps.event.addListener(that.object_,
                eventName, function (e, args) {
            komoo.event.trigger(that, eventName, e, args);
        });
    }