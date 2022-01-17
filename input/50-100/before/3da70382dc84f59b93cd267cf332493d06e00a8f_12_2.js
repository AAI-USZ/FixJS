function(positions) {
        if (positions) {
            var cartographics = [];

            var length = positions.length;
            for ( var i = 0; i < length; ++i) {
                cartographics.push(this.toCartographic3(positions[i]));
            }

            return cartographics;
        }
    }