function getColumnGraphData(filters, category) {
    var data = [];
    data[0] = [];
    data[1] = [];
    data[0][0] = '';
    data[1][0] = '';
    jQuery.each(currentData[category], function(i, catData) {
        data[0][i+1] = catData[category];
        data[1][i+1] = catData.count;
    });
    return data;
}