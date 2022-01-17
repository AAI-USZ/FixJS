function(positions) {
        if (positions) {
            var cartesians = [];

            var length = positions.length;
            for ( var i = 0; i < length; ++i) {
                cartesians.push(this.toCartesian(positions[i]));
            }

            return cartesians;
        }
    }