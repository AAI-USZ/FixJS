function getData(filters, categories) {
    customData = {};
    $.each(categories, function(i, category) {
        currentData[category] = getCategoryData(filters, category);
    });
    customData.irregularidades = getIrregularidades(filters);
}