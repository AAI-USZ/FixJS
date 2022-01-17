function(cartographicPosition) {
        return cartographicPosition.longitude >= this.west &&
               cartographicPosition.longitude <= this.east &&
               cartographicPosition.latitude >= this.south &&
               cartographicPosition.latitude <= this.north;
    }