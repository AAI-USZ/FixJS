function (args) {
            console.log(eventName);
            komoo.event.trigger(that, eventName, args);
        }