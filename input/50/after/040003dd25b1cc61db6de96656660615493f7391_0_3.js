function (e) {
            google.maps.event.trigger(komooMap.tooltip.feature, "click", {latLng: komooMap.tooltip.getPosition()});
        }