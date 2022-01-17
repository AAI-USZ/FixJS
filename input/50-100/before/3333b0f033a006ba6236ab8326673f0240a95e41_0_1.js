function getAvailableData(filters, categories) {
    var available = {};
    if(categories instanceof Array) {
        $.each(categories, function(i, category) {
            available[category] = getCategoryAvailableData(filters, category);
        });
    } else {
        available[categories] = getCategoryAvailableData(filters, categories);
    }
    return available;
}