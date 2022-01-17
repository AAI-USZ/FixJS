function(i, catData) {
        data[i+1] = [];
        data[i+1][0] = catData[category];
        filters[category] = catData[category];
        data[i+1][1] = getIrregularidadesCount(filters);
    }