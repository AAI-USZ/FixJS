function() {
            // hover details
            var hoverDetail = new Rickshaw.Graph.HoverDetail( {
                graph: report.graph,
                xFormatter: function(x) { // Display step name (remove step number)
                    return report.steps[x].substr(4);
                },
                yFormatter: function(y) { // Display percentage of total users
                    return (report.total === 0) ? '0' : Math.round(y / report.total * 100) + '%';
                }
            } );

            // y axis
            var yAxis = new Rickshaw.Graph.Axis.Y({
                graph: report.graph
            });

            yAxis.render();
        }