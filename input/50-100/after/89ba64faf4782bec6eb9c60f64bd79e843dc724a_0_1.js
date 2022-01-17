function getData(filters, categories) {
    var customData = {};
    $.each(categories, function(i, category) {
        customData[category] = getCategoryData(filters, category);
    });
    customData.irregularidades = getIrregularidades(filters);
    return customData;
}