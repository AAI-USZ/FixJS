function () {
        button_click();
        /**
         * @name komoo.Map#finish_click
         * @event
         */
        komooMap.event.trigger("finish_click", komooMap.featureOptions[komooMap.type]);
        komooMap.type = null;
        komooMap.setEditMode(undefined);
    }