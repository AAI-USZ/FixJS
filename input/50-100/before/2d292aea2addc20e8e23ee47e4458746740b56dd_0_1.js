function(col) { 
                var elem = $('.chart.' + scope + '.' + col.name).get(0);
                console.log(scope, col, elem);
                new google.visualization.LineChart(elem)
                    .draw(tablify(data[scope], col.name), { 'title': scope + ' usage stats: ' + col.label,
                                                          'width': 1000,
                                                          'height': 420 });
            }