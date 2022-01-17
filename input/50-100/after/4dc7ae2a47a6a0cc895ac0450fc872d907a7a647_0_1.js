function(pin)
        {
            Log('debug', "Pin removed");
            _markers[pin.Uid].setMap(null);
            _markerCluster.removeMarker(_markers[pin.Uid])
            _oms.removeMarker(_markers[pin.Uid])
            delete _markers[pin.Uid];
        }