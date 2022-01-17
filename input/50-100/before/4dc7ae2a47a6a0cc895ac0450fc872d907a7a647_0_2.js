function(marker) {
                iw.setContent(marker.desc);
                iw.open(_map, marker);
                var pin = _this.Pins.getPinRef(marker.markerID);
                pin.onClick.apply();
            }