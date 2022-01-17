function(s) {
        // calculate distance in y-plane from centre
        var dist = Math.abs(coords.y - (s.zone.lry - (s.zone.lry - s.zone.uly)/2));
        if (coords.x < s.zone.ulx) {
            dist += s.zone.ulx - coords.x;
        }
        else if (coords.x > s.zone.lrx) {
            dist += coords.x - s.zone.lrx;
        }

        return dist;
    }