function () {
        button_click();
        if (komooMap.newFeatures.length > 0) { // User drew a feature, so remove it.
            komooMap.newFeatures.forEach(function (item, index, orig) {
                var feature = komooMap.features.pop(); // The newly created feature should be the last at array.
                feature.setMap(null);
            });
            komooMap.newFeatures.clear();
        }
        /**
         * @name komoo.Map#cancel_click
         * @event
         */
        komooMap.event.trigger("cancel_click");
        komooMap.type = null;
        komooMap.setEditMode(undefined);
    }