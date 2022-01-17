function(marker) {
                iw.setContent(marker.desc);
                iw.open(_map, marker);
                var pin = _this.Pins.getPin(marker.markerID);
                pin.onClick.apply();
                console.log(pin);
            }