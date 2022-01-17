function theMagic() {

    var $resultsContainer = $('#data');
    var $resultsHeader = $resultsContainer.find('header .inside');
    var $dataTable = $resultsContainer.find('#data-table');
    var $links = $resultsContainer.find('#links');
    var $graphsContainer = $resultsContainer.find('#graphs');
    var $irregularidadesContainer = $resultsContainer.find('#irregularidades');

    $resultsHeader.empty();
    $dataTable.empty();
    $links.empty();
    $graphsContainer.empty();
    $irregularidadesContainer.removeClass('active').empty();

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
            var attrs;
            if(!count) {
                count = '--';
                attrs = false;
            } else {
                totalCount = totalCount + count;
                attrs = 'class="filterable" onClick="addFilter(\'programa\', \'' + programa.programa + '\');"';
            }
            var average = Math.ceil(programa.constatacoes/32);
            totalAverage = Math.ceil(totalAverage + (programa.constatacoes/32));
            tableContent += '<tr><td class="n">' + count + '</td><td ' + attrs + '>' + programa.programa_desc + '</td><td class="m">' + average + '</td></tr>';
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
        $('#graph01').before('<h3>Irregularidades por programa</h3>');
        tableData.programa = currentData.programa;
        drawColumnChart('', selectedFilters, 'cidade', 'graph02');
        $('#graph02').before('<h3>Irregularidades por cidade</h3>');

        // data table
        var tableContent = '';
        tableContent += '<table class="regular"><tbody><tr><th class="total">Total</th><th>Programas</th><th class="n"></th></tr>';
        var totalCount = 0;
        tableContent += '<tr><td rowspan="10" class="total"></td></tr>';
        $.each(eduamazonia.programa, function(i, programa) {
            var itemData = jLinq.from(tableData.programa).starts('programa', programa.programa).select();
            $.each(itemData, function(key, value) { itemData = value });
            var count = itemData.count;
            var attrs;
            if(!count) {
                count = '--';
                attrs = false;
            } else {
                totalCount = totalCount + count;
                attrs = 'class="filterable" onClick="addFilter(\'programa\', \'' + programa.programa + '\');"';
            }
            tableContent += '<tr><td ' + attrs + '>' + programa.programa_desc + '</td><td class="n">' + count + '</td></tr>';
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
        tableContent += '<tr><td rowspan="6" class="total"></td></tr>';
        $.each(eduamazonia.tipo, function(i, tipo) {
            var itemData = jLinq.from(tableData.tipo).starts('tipo', tipo.tipo).select();
            $.each(itemData, function(key, value) { itemData = value });
            var count = itemData.count;
            var attrs;
            if(!count) {
                count = '--';
                attrs = false;
            } else {
                totalCount = totalCount + count;
                attrs = 'class="filterable" onClick="addFilter(\'tipo\', \'' + tipo.tipo + '\');"';
            }
            tableContent += '<tr><td ' + attrs + '>' + tipo.tipo + '</td><td class="n">' + count + '</td></tr>';
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
        tableContent += '<tr><td rowspan="10" class="total"></td></tr>';
        $.each(eduamazonia.programa, function(i, programa) {
            var itemData = jLinq.from(tableData.programa).starts('programa', programa.programa).select();
            $.each(itemData, function(key, value) { itemData = value });
            var count = itemData.count;
            var attrs;
            if(!count) {
                count = '--';
                attrs = false;
            } else {
                totalCount = totalCount + count;
                attrs = 'class="filterable" onClick="addFilter(\'programa\', \'' + programa.programa + '\');"';
            }
            tableContent += '<tr><td ' + attrs + '>' + programa.programa_desc + '</td><td class="n">' + count + '</td></tr>';
        });
        tableContent += '</tbody></table>';

        $dataTable.append(tableContent);
        $dataTable.find('td.total').text(totalCount);
        $dataTable.find('td.total').append('<span>irregularidades</span>');
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
        var totalCount = getIrregularidadesCount(selectedFilters);
        tableContent += '<tr><td rowspan="11" class="total"></td></tr>';
        $.each(tableData.cidade, function(i, cidade) {
            var attrs = 'class="filterable" onClick="addFilter(\'cidade\', \'' + cidade.cidade + '\');"';
            if(i < 10) tableContent += '<tr><td ' + attrs + '>' + cidade.cidade + '</td><td class="n">' + cidade.count + '</td></tr>';
        });
        tableContent += '</tbody></table>';
        $dataTable.append(tableContent);
        $dataTable.find('td.total').text(totalCount);
        $dataTable.find('td.total').append('<span>irregularidades</span>');
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
        tableContent += '<tr><td rowspan="6" class="total"></td></tr>';
        $.each(eduamazonia.tipo, function(i, tipo) {
            var itemData = jLinq.from(tableData.tipo).starts('tipo', tipo.tipo).select();
            $.each(itemData, function(key, value) { itemData = value });
            var count = itemData.count;
            var attrs;
            if(!count) {
                count = '--';
                attrs = false;
            } else {
                totalCount = totalCount + count;
                attrs = 'class="filterable" onClick="addFilter(\'tipo\', \'' + tipo.tipo + '\');"';
            }
            tableContent += '<tr><td ' + attrs + '>' + tipo.tipo + '</td><td class="n">' + count + '</td></tr>';
        });
        tableContent += '</tbody></table>';

        $dataTable.append(tableContent);
        $dataTable.find('td.total').text(totalCount);
        $dataTable.find('td.total').append('<span>irregularidades</span>');
    } else if(selectedFilters.cidade && selectedFilters.tipo && selectedFilters.programa) {
        /*--CIDADE+TIPO+PROGRAMA
            só lista
        */
        $dataTable.append('<p class="total">Total: ' + getIrregularidadesCount(selectedFilters) + ' irregularidades</p>');
    }

    // irregularidades table
    if(Object.keys(selectedFilters).length >= 2) {
        var category = categories[0];
        if(category)
            var categoryTitle = category.charAt(0).toUpperCase() + category.slice(1) + 's';
        if(Object.keys(selectedFilters).length == 2) 
            $links.append('<a class="irregularidades-toggle button" href="#">Exibir a lista de irregularidades</a>');
        else
            $irregularidadesContainer.addClass('active');

        var irregularidadesContent = '';
        irregularidadesContent += '<table class="irregularidades"><tbody><tr>';
        if(category) irregularidadesContent += '<th class="' + category + ' category">' + categoryTitle + '</th>';
        irregularidadesContent += '<th>Irregularidades</th></tr>';
        $.each(currentData.irregularidades, function(i, irregularidade) {
            irregularidadesContent += '<tr>';
            if(category) irregularidadesContent += '<td title="' + irregularidade[category] + '" class="' + category + ' ' + normalize(irregularidade[category]) + '">' + irregularidade[category] + '</td>';
            irregularidadesContent += '<td><p>' + irregularidade.constatacao + '</p></td>';
        })
        irregularidadesContent += '</tbody></table>';
        $irregularidadesContainer.append(irregularidadesContent);
    }

    if(selectedFilters.cidade) {
        var filterData = jLinq.from(eduamazonia.cidade).starts('cidade', selectedFilters.cidade).select();
        filterData = filterData[0];
        $links.append('<a class="relatorio button" href="#" target="_blank">Acesse o relatório de fiscalização da cidade</a>');
        $('.relatorio.button').attr('href', 'relatorios/' + filterData.relatorio);
    }

    $('.irregularidades-toggle').click(function() {
        if(!$irregularidadesContainer.hasClass('active')) {
            $irregularidadesContainer.addClass('active');
            $(this).text('Esconder a lista de irregularidades');
            resultsScrollApi.reinitialise();
            $()
        } else {
            $irregularidadesContainer.removeClass('active');
            $(this).text('Exibir a lista de irregularidades');
            resultsScrollApi.reinitialise();
        }
        return false;
    });

    resultsScrollApi.reinitialise();
    $('.jspPane, .jspDrag').css({'top':0});
}