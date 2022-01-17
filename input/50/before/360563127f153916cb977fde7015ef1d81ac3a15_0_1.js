function(eventName, args) {
        var timerId = setTimeout(function() {
            Onc.EventBus.fireEvent(eventName, args);
        }, 0);
    }