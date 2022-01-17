function(key, value) {
        var filtering = {};
        var count;
        filtering[category] = value[category];
        var mixedFilter = $.extend({}, filters, filtering);
        //console.log(mixedFilter);
        count = getIrregularidadesCount(mixedFilter);
        if(count >= 1) {
            availableCategoryData[i] = value;
            availableCategoryData[i].count = count;
            i++;
            //console.log(availableCategoryData[i]);
        }
    }