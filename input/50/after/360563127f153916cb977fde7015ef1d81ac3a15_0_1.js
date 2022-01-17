function() {
        var args = arguments;
        timerId = setTimeout(function() {
            Onc.EventBus.fireEvent.apply(Onc.EventBus, args);
        }, 0);
    }