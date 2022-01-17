function getAvailableData(filters, categories) {
    var availableData = {};
    if(categories instanceof Array) {
        $.each(categories, function(i, category) {
            availableData[category] = getCategoryAvailableData(filters, category);
        });
    } else {
        availableData[categories] = getCategoryAvailableData(filters, categories);
    }
    return availableData;
}