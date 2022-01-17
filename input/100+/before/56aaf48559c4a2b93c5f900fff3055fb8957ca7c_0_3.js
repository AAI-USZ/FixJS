function getPieGraphData(filters, category) {
    var data = [];
    data[0] = [];
    data[0][0] = '';
    data[0][1] = '';
    jQuery.each(currentData[category], function(i, catData) {
        data[i+1] = [];
        data[i+1][0] = catData[category];
        data[i+1][1] = catData.count;
    });
    return data;
}