function(el) {
        var color = getProportionalColor(el.properties.count / (el.properties.countMax * 1.2));
        return {fillColor: color, fillOpacity: 0.9, color:'grey', weight: 1};
    }