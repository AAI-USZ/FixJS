function getCategoryAvailableData(filters, category) {
    var availableCategoryData = [];
    var i = 0;
    $.each(eduamazonia[category], function(key, value) {
        var filtering = {};
        var count;
        filtering[category] = value[category];
        var mixedFilter = $.extend({}, filters, filtering);
        count = getIrregularidadesCount(mixedFilter);
        if(count >= 1) {
            availableCategoryData[i] = value;
            availableCategoryData[i].count = count;
            i++;
        }
    });
    var sortedData = jLinq.from(availableCategoryData).sort('-count').select();
    return sortedData;
}