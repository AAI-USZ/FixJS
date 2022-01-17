function(el) {
        // TODO: remove rawdata from properties, go through formJSONManager or somesuch instead
        var numerator = _.reduce(el.properties.rawdata, function(numer, instance) {
                            return numer + (_.contains(responseNames, instance.response[questionName]) ? 1 : 0);
                        }, 0.0);
        var denominator = el.properties.rawdata.length;
        var color = getProportionalColor(numerator / denominator);
        var opacity = 0.9;
        return { fillColor: color, fillOpacity: opacity, color: 'grey', weight: 1 };
                   
    }