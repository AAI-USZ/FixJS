function theMagic(selectedFilters) {
    var graphsContainer = $('#graphs');
    graphsContainer.empty();
    if(selectedFilters.cidade && !selectedFilters.tipo && !selectedFilters.programa) {
        /*--CIDADE
            gráfico coluna
            - programa
            - tipo
        */
        graphsContainer.append('<div id="graph01"></div>');
        drawCidade(selectedFilters, 'graph01');
    } else if(!selectedFilters.cidade && selectedFilters.tipo && !selectedFilters.programa) {
        /*--TIPO
            gráfico pizza
            - programa
            gráfico barra
            - cidade
        */
        graphsContainer.append('<div id="graph01"></div><div id="graph02"></div>');
        drawPieChart('', selectedFilters, 'programa', 'graph01');
        drawBarChart('', selectedFilters, 'cidade', 'graph02');
    } else if(!selectedFilters.cidade && !selectedFilters.tipo && selectedFilters.programa) {
        /*--PROGRAMA
            gráfico pizza
            - tipo
            gráfico barra
            - cidade
        */
        graphsContainer.append('<div id="graph01"></div><div id="graph02"></div>');
        drawPieChart('', selectedFilters, 'tipo', 'graph01');
        drawBarChart('', selectedFilters, 'cidade', 'graph02');
    } else if(selectedFilters.cidade && selectedFilters.tipo && !selectedFilters.programa) {
        /*--CIDADE+TIPO
            gráfico pizza
            - programa
            gráfico pizza (total)
            - programa
        */
        graphsContainer.append('<div id="graph01"></div><div id="graph02"></div>');
        drawPieChart('', selectedFilters, 'programa', 'graph01');
        selectedFilters.cidade = '';
        drawPieChart('Total', selectedFilters, 'programa', 'graph02');
    } else if(!selectedFilters.cidade && selectedFilters.tipo && selectedFilters.programa) {
        /*--TIPO+PROGRAMA
            gráfico barra
            - cidade
        */
    } else if(selectedFilters.cidade && !selectedFilters.tipo && selectedFilters.programa) {
        /*--CIDADE+PROGRAMA
            gráfico pizza
            - tipo
            gráfico pizza (total)
            - tipo
        */
        graphsContainer.append('<div id="graph01"></div><div id="graph02"></div>');
        drawPieChart('Filtro', selectedFilters, 'tipo', 'graph01');
        selectedFilters.cidade = '';
        drawPieChart('Total', selectedFilters, 'tipo', 'graph02');
    } else if(selectedFilters.cidade && selectedFilters.tipo && selectedFilters.programa) {
        /*--CIDADE+TIPO+PROGRAMA
            só lista
        */
    }
}