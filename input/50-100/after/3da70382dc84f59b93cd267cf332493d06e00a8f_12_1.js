function(positions) {
        var length = positions.length;
        var cartesians = new Array(length);
        for ( var i = 0; i < length; ++i) {
            cartesians[i] = this.cartographicToCartesian(positions[i]);
        }
        return cartesians;
    }