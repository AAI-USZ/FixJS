function getGraphData(filters, category) {
    var availableData = getAvailableData(filters, category);
    console.log(availableData);
    var data = [];
    data[0] = [];
    if(category == 'tipo') {
        data[0][0] = 'Tipo';
    } else if(category == 'programa') {
        data[0][0] = 'Programa';
    }
    if(category == 'cidade') {
        data[0][0] = 'Cidade';
    }
    data[0][1] = 'Irregularidades';
    jQuery.each(availableData[category], function(i, catData) {
        data[i+1] = [];
        data[i+1][0] = catData[category];
        filters[category] = catData[category];
        data[i+1][1] = getIrregularidadesCount(filters);
    });
    return data;
}