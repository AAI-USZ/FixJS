function (e) {
            google.maps.event.trigger(komooMap.tooltip.overlay, "click", {latLng: komooMap.tooltip.getPosition()});
        }