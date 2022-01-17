function (feature) {
        var type = feature.geometry.type;
        switch (type) {
            case 'Point':
            case 'MultiPoint':
                return {
                    color: 'rgba(252,146,114,0.6)',
                    radius: 5
                };
                
            case 'LineString':
            case 'MultiLineString':
                return {
                    color: 'rgba(161,217,155,0.8)',
                    size: 3
                };

            case 'Polygon':
            case 'MultiPolygon':
                return {
                    color: 'rgba(43,140,190,0.4)',
                    outline: {
                        color: 'rgb(0,0,0)',
                        size: 1
                    }
                };

            default:
                return null;
        }
    }