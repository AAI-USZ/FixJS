function(key, value) {
        var filtering = {};
        filtering[category] = value[category];
        $.extend(filtering, filters);
        var count = getIrregularidadesCount(filtering);
        if(count >= 1) {
            categoryAvailableData[i] = value;
            i++;
        }
    }