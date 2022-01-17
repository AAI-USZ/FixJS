function() { 
            selectors = $(target).attr('data-selector').split(',');
            metric = $(target).attr('data-metric');
            source_table = $(target).attr('data-source-table');
            if(source_table)
            {
                this_head = $('th[data-extra=graphable][data-name="'+metric+'"]', source_table)
                $('[data-extra=graph-icon]').remove();
                $(this_head).append($('<i>').attr('data-extra', 'graph-icon')
                    .addClass('icon').addClass('icon-signal').addClass('icon-white')
                    );
            }
            tables = $.map(selectors, function(s) { 
                return $(s+ ' table[data-metric="'+metric+'"]')});
            datum = d3.range(tables.length).map(function(i) {
                t = tables[i]
                return {
                    key: $(t).attr('data-hw-name'),
                    color: $(t).attr('data-hw-color'),
                    values: $.map($('tr', t), function(data_row) {
                        cells = $('td', data_row);
                        if(cells.length != 2)
                            return;
                        return {x: new Date(cells[0].innerText), y: parseFloat(cells[1].innerText)};})
                };
            }, tables);
            var chart = nv.models.lineChart()
                .color(d3.scale.category10().range());
            chart.xAxis
                .tickFormat(function(d) {
                  return d3.time.format('%x')(new Date(d))
                 });
 
            chart.yAxis
                .tickFormat(d3.format(',.1'));
            svg = $('svg', target);
            d3.select(svg[0])
                .datum(datum)
                .transition().duration(500)
                .call(chart);
            nv.utils.windowResize(chart.update);
            return chart;
        }