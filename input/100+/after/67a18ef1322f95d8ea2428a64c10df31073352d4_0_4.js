function getCidadeGraphData(filters) {
    var data = [];
    data[0] = [];

    var cidade = filters.cidade;

    // setup header
    data[0][0] = '';
    jQuery.each(currentData.tipo, function(i, tipoData) {
        data[0][i+1] = tipoData.tipo;
    });

    // rows
    jQuery.each(currentData.programa, function(programaIndex, programaData) {
        data[programaIndex+1] = [];
        data[programaIndex+1][0] = programaData.programa_desc;
        jQuery.each(currentData.tipo, function(tipoIndex, tipoData) {
            data[programaIndex+1][tipoIndex+1] = getIrregularidadesCount({
                'programa': programaData.programa,
                'tipo': tipoData.tipo,
                'cidade': cidade
            });
        });
    });
    return data;
}