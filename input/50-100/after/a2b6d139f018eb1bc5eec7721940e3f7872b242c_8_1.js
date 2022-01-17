function() {
                resetAllFilters();
                d3.select("body").append("div").attr("id", "bar-chart3");
                var chart = dc.barChart("#bar-chart3");
                chart.dimension(valueDimension).group(valueGroup)
                    .width(400).height(150)
                    .x(d3.scale.linear().domain([10,80]))
                    .yElasticity(true)
                    .transitionDuration(0);
                chart.render();
                return chart;
            }