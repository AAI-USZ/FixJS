function(pin)
        {
            Log('debug', "Pin removed");
            _markers[pin.Uid].setMap(null);
            delete _markers[pin.Uid];
        }