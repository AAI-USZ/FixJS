function theMagic() {

    var tableData = {};

    var title = '';
    $.each(selectedFilters, function(filter, filterName) {
        title += filterName;
    });
    if(selectedFilters.cidade && !selectedFilters.programa && !selectedFilters.tipo) {
        title = selectedFilters.cidade;
    } else if(selectedFilters.cidade && selectedFilters.programa && !selectedFilters.tipo) {
        title = selectedFilters.programa + ' em ' + selectedFilters.cidade;
    } else if(selectedFilters.cidade && selectedFilters.programa && selectedFilters.tipo) {
        title = selectedFilters.tipo + ' em ' + selectedFilters.programa + ' na cidade de ' + selectedFilters.cidade;
    } else if(!selectedFilters.cidade && selectedFilters.programa && selectedFilters.tipo) {
        title = selectedFilters.tipo + ' em ' + selectedFilters.programa;
    }

    var $resultsContainer = $('#data');
    var $resultsHeader = $resultsContainer.find('header');

    $resultsHeader
        .empty()
        .append('<h2>' + title + '</h2>');

    var $dataTable = $resultsContainer.find('#data-table');
    $dataTable.empty();

    // LOADING CONTENT

    var $graphsContainer = $resultsContainer.find('#graphs');
    $graphsContainer.empty();
    // clear select options

    if(selectedFilters.cidade && !selectedFilters.tipo && !selectedFilters.programa) {
        /*--CIDADE
            gráfico coluna
            - programa
            - tipo
        */
        $graphsContainer.append('<div id="graph01" class="graph-container"></div>');
        drawCidade(selectedFilters, 'graph01');
        $('#graph01').before('<h3>Irregularidades por programa na cidade</h3>');
        tableData.programa = currentData.programa;

        // data table
        var tableContent = '';
        tableContent += '<table><tbody><tr><th class="n">Número de irregularidades</th><th>Programas do governo</th><th class="m">Média das cidades fiscalizadas</th></tr>';
        var totalCount = 0;
        var totalAverage = 0;
        $.each(eduamazonia.programa, function(i, programa) {
            var itemData = jLinq.from(tableData.programa).starts('programa', programa.programa).select();
            $.each(itemData, function(key, value) { itemData = value });
            var count = itemData.count;
            if(!count) count = '--';
            else totalCount = totalCount + count;
            var average = Math.ceil(programa.constatacoes/32);
            totalAverage = Math.ceil(totalAverage + (programa.constatacoes/32));
            tableContent += '<tr><td class="n">' + count + '</td><td>' + programa.programa_desc + '</td><td class="m">' + average + '</td></tr>';
        });
        tableContent += '<tr class="total"><td class="n">' + totalCount + '</td><td>TOTAL</td><td class="m">' + totalAverage + '</td></tr>';
        tableContent += '</tbody></table>';

        $dataTable.append(tableContent);

    } else if(!selectedFilters.cidade && selectedFilters.tipo && !selectedFilters.programa) {
        /*--TIPO
            gráfico pizza
            - programa
            gráfico barra
            - cidade
        */
        $graphsContainer.append('<div id="graph01" class="graph-container"></div><div id="graph02" class="graph-container"></div>');
        drawPieChart('', selectedFilters, 'programa', 'graph01');
        tableData.programa = currentData.programa;
        drawColumnChart('', selectedFilters, 'cidade', 'graph02');

        // data table
        var tableContent = '';
        tableContent += '<table><tbody><tr><th class="total">Total</th><th>Programas</th><th></th></tr>';
        var totalCount = 0;
        var totalAverage = 0;
        tableContent += '<tr><td rowspan="10" class="total"></td></tr>';
        $.each(eduamazonia.programa, function(i, programa) {
            var itemData = jLinq.from(tableData.programa).starts('programa', programa.programa).select();
            $.each(itemData, function(key, value) { itemData = value });
            var count = itemData.count;
            if(!count) count = '--';
            else totalCount = totalCount + count;
            tableContent += '<tr><td>' + programa.programa_desc + '</td><td class="n">' + count + '</td></tr>';
        });
        tableContent += '</tbody></table>';

        $dataTable.append(tableContent);
        $dataTable.find('td.total').text(totalCount);
        $dataTable.find('td.total').append('<span>irregularidades</span>');
    } else if(!selectedFilters.cidade && !selectedFilters.tipo && selectedFilters.programa) {
        /*--PROGRAMA
            gráfico pizza
            - tipo
            gráfico barra
            - cidade
        */
        $graphsContainer.append('<div id="graph01" class="graph-container"></div><div id="graph02" class="graph-container"></div>');
        drawPieChart('', selectedFilters, 'tipo', 'graph01');
        tableData.tipo = currentData.tipo;
        drawColumnChart('', selectedFilters, 'cidade', 'graph02');

        // data table
        var tableContent = '';
        tableContent += '<table><tbody><tr><th class="total">Total</th><th>Tipos de irregularidades</th><th></th></tr>';
        var totalCount = 0;
        var totalAverage = 0;
        tableContent += '<tr><td rowspan="6" class="total"></td></tr>';
        $.each(eduamazonia.tipo, function(i, tipo) {
            var itemData = jLinq.from(tableData.tipo).starts('tipo', tipo.tipo).select();
            $.each(itemData, function(key, value) { itemData = value });
            var count = itemData.count;
            if(!count) count = '--';
            else totalCount = totalCount + count;
            tableContent += '<tr><td>' + tipo.tipo + '</td><td class="n">' + count + '</td></tr>';
        });
        tableContent += '</tbody></table>';

        $dataTable.append(tableContent);
        $dataTable.find('td.total').text(totalCount);
        $dataTable.find('td.total').append('<span>irregularidades</span>');
    } else if(selectedFilters.cidade && selectedFilters.tipo && !selectedFilters.programa) {
        /*--CIDADE+TIPO
            gráfico pizza
            - programa
            gráfico pizza (total)
            - programa
        */
        $graphsContainer.append('<div id="graph01" class="graph-container"></div><div id="graph02" class="graph-container"></div>');
        drawPieChart('', selectedFilters, 'programa', 'graph01');
        tableData.programa = currentData.programa;
        selectedFilters.cidade = '';
        drawPieChart('Total', selectedFilters, 'programa', 'graph02');
    } else if(!selectedFilters.cidade && selectedFilters.tipo && selectedFilters.programa) {
        /*--TIPO+PROGRAMA
            gráfico barra
            - cidade
        */
        $graphsContainer.append('<div id="graph01" class="graph-container"></div>');
        drawColumnChart('', selectedFilters, 'cidade', 'graph01');
        tableData.cidade = currentData.cidade;
    } else if(selectedFilters.cidade && !selectedFilters.tipo && selectedFilters.programa) {
        /*--CIDADE+PROGRAMA
            gráfico pizza
            - tipo
            gráfico pizza (total)
            - tipo
        */
        $graphsContainer.append('<div id="graph01"></div><div id="graph02"></div>');
        drawPieChart('Filtro', selectedFilters, 'tipo', 'graph01');
        tableData.tipo = currentData.tipo;
        console.log(tableData);
        drawPieChart('Total', selectedFilters, 'tipo', 'graph02');

        // data table
        var tableContent = '';
        tableContent += '<table><tbody><tr><th class="total">Total</th><th>Tipos de irregularidades</th><th></th></tr>';
        var totalCount = 0;
        var totalAverage = 0;
        tableContent += '<tr><td rowspan="6" class="total"></td></tr>';
        $.each(eduamazonia.tipo, function(i, tipo) {
            var itemData = jLinq.from(tableData.tipo).starts('tipo', tipo.tipo).select();
            $.each(itemData, function(key, value) { itemData = value });
            var count = itemData.count;
            if(!count) count = '--';
            else totalCount = totalCount + count;
            tableContent += '<tr><td>' + tipo.tipo + '</td><td class="n">' + count + '</td></tr>';
        });
        tableContent += '</tbody></table>';

        $dataTable.append(tableContent);
        $dataTable.find('td.total').text(totalCount);
        $dataTable.find('td.total').append('<span>irregularidades</span>');
    } else if(selectedFilters.cidade && selectedFilters.tipo && selectedFilters.programa) {
        /*--CIDADE+TIPO+PROGRAMA
            só lista
        */
    }
}