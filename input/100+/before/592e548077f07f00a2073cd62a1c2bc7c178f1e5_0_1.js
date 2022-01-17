function theMagic() {

    var $resultsContainer = $('#data');
    var $resultsHeader = $resultsContainer.find('header .inside');
    var $dataTable = $resultsContainer.find('#data-table');
    var $links = $resultsContainer.find('#links');
    var $graphsContainer = $resultsContainer.find('#graphs');

    $resultsHeader.empty();
    $dataTable.empty();
    $links.empty();
    $graphsContainer.empty();

    if($.isEmptyObject(selectedFilters)) {
        $resultsContainer.find('.landing').show();
        resultsScrollApi.reinitialise();
        return false;
    } else $resultsContainer.find('.landing').hide();

    var tableData = {};

    var title = '';
    $.each(selectedFilters, function(filter, filterName) {
        title += filterName;
    });
    if(selectedFilters.cidade && !selectedFilters.programa && !selectedFilters.tipo) {
        title = selectedFilters.cidade;
    } else if(selectedFilters.cidade && selectedFilters.programa && !selectedFilters.tipo) {
        title = selectedFilters.programa + ' na cidade de ' + selectedFilters.cidade;
    } else if(selectedFilters.cidade && !selectedFilters.programa && selectedFilters.tipo) {
        title = selectedFilters.tipo + ' na cidade de ' + selectedFilters.cidade;
    } else if(selectedFilters.cidade && selectedFilters.programa && selectedFilters.tipo) {
        title = selectedFilters.tipo + ' em ' + selectedFilters.programa + ' na cidade de ' + selectedFilters.cidade;
    } else if(!selectedFilters.cidade && selectedFilters.programa && selectedFilters.tipo) {
        title = selectedFilters.tipo + ' em ' + selectedFilters.programa;
    }



    $resultsHeader.append('<h2>' + title + '</h2>');

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

        $links.append('<a class="button" href="#">Acesse o relatório de fiscalização da cidade</a>');

    } else if(!selectedFilters.cidade && selectedFilters.tipo && !selectedFilters.programa) {
        /*--TIPO
            gráfico pizza
            - programa
            gráfico barra
            - cidade
        */
        $graphsContainer.append('<div id="graph01" class="graph-container"></div><div id="graph02" class="graph-container"></div>');
        drawPieChart('', selectedFilters, 'programa', 'graph01');
        $('#graph01').before('<h3>Irregularidades por programa</h3>');
        tableData.programa = currentData.programa;
        drawColumnChart('', selectedFilters, 'cidade', 'graph02');
        $('#graph02').before('<h3>Irregularidades por cidade</h3>');

        // data table
        var tableContent = '';
        tableContent += '<table class="regular"><tbody><tr><th class="total">Total</th><th>Programas</th><th class="n"></th></tr>';
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
        $('#graph01').before('<h3>Irregularidades por tipo</h3>');
        tableData.tipo = currentData.tipo;
        drawColumnChart('', selectedFilters, 'cidade', 'graph02');
        $('#graph02').before('<h3>Irregularidades por cidade</h3>');

        // data table
        var tableContent = '';
        tableContent += '<table class="regular"><tbody><tr><th class="total">Total</th><th>Tipos de irregularidades</th><th class="n"></th></tr>';
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
        $('#graph01').before('<h3>Irregularidades por programa</h3>');
        tableData.programa = currentData.programa;
        drawPieChart('Total', selectedFilters, 'programa', 'graph02');
        $('#graph02').before('<h3>Comparativo com o total de irregularidades por programa</h3>');

        // data table
        var tableContent = '';
        tableContent += '<table class="regular"><tbody><tr><th class="total">Total</th><th>Programas</th><th class="n"></th></tr>';
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

        $links.append('<a class="button" href="#">Veja a lista de irregularidades</a>');
        $links.append('<a class="button" href="#">Acesse o relatório de fiscalização da cidade</a>');

    } else if(!selectedFilters.cidade && selectedFilters.tipo && selectedFilters.programa) {
        /*--TIPO+PROGRAMA
            gráfico barra
            - cidade
        */
        $graphsContainer.append('<div id="graph01" class="graph-container"></div>');
        drawColumnChart('', selectedFilters, 'cidade', 'graph01');
        $('#graph01').before('<h3>Irregularidades por cidade</h3>');
        tableData.cidade = currentData.cidade;

        // data table
        var tableContent = '';
        tableContent += '<table class="regular"><tbody><tr><th class="total">Total</th><th>As 10 cidades com mais irregularidades</th><th class="n"></th></tr>';
        var totalCount = 0;
        var totalAverage = 0;
        tableContent += '<tr><td rowspan="11" class="total"></td></tr>';
        console.log(tableData.cidade);
        $.each(tableData.cidade, function(i, cidade) {
            if(i == 10) return false;
            var count = cidade.count;
            totalCount = totalCount + count;
            tableContent += '<tr><td>' + cidade.cidade + '</td><td class="n">' + count + '</td></tr>';
        });
        tableContent += '</tbody></table>';

        $dataTable.append(tableContent);
        $dataTable.find('td.total').text(totalCount);
        $dataTable.find('td.total').append('<span>irregularidades</span>');

        $links.append('<a class="button" href="#">Veja a lista de irregularidades</a>');

    } else if(selectedFilters.cidade && !selectedFilters.tipo && selectedFilters.programa) {
        /*--CIDADE+PROGRAMA
            gráfico pizza
            - tipo
            gráfico pizza (total)
            - tipo
        */
        $graphsContainer.append('<div id="graph01"></div><div id="graph02"></div>');
        drawPieChart('Filtro', selectedFilters, 'tipo', 'graph01');
        $('#graph01').before('<h3>Irregularidades por tipo</h3>');
        tableData.tipo = currentData.tipo;
        drawPieChart('Total', selectedFilters, 'tipo', 'graph02');
        $('#graph02').before('<h3>Comparativo com o total de irregularidades por tipo</h3>');

        // data table
        var tableContent = '';
        tableContent += '<table class="regular"><tbody><tr><th class="total">Total</th><th>Tipos de irregularidades</th><th class="n"></th></tr>';
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

        $links.append('<a class="button" href="#">Veja a lista de irregularidades</a>');
        $links.append('<a class="button" href="#">Acesse o relatório de fiscalização da cidade</a>');
    } else if(selectedFilters.cidade && selectedFilters.tipo && selectedFilters.programa) {
        /*--CIDADE+TIPO+PROGRAMA
            só lista
        */
    }

    resultsScrollApi.reinitialise();
}