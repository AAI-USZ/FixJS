function() {
                valueDimension.filter(66);
                d3.select("body").append("div").attr("id", "bar-chart2");
                var chart = dc.barChart("#bar-chart2");
                chart.dimension(dateDimension).group(dateGroup)
                    .width(width).height(height)
                    .x(d3.time.scale().domain([new Date(2000, 0, 1), new Date(2012, 11, 31)]))
                    .xUnits(d3.time.days);
                chart.render();
                return chart;
            }