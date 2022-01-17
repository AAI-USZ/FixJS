function ValueHolder(czmlInterval) {
        var i, len, values = [], tmp;

        tmp = czmlInterval.cartesian;
        if (typeof tmp !== 'undefined') {
            for (i = 0, len = tmp.length; i < len; i += 3) {
                values.push(new Cartesian3(tmp[i], tmp[i + 1], tmp[i + 2]));
            }
            this.cartesian = values;
        } else {
            tmp = czmlInterval.cartographicRadians;
            if (typeof tmp !== 'undefined') {
                for (i = 0, len = tmp.length; i < len; i += 3) {
                    values.push(new Cartographic3(tmp[i], tmp[i + 1], tmp[i + 2]));
                }
                this.cartographic = values;
            } else {
                tmp = czmlInterval.cartographicDegrees;
                if (typeof tmp !== 'undefined') {
                    for (i = 0, len = tmp.length; i < len; i += 3) {
                        values.push(new Cartographic3(CesiumMath.toRadians(tmp[i]), CesiumMath.toRadians(tmp[i + 1]), tmp[i + 2]));
                    }
                    this.cartographic = values;
                }
            }
        }
    }