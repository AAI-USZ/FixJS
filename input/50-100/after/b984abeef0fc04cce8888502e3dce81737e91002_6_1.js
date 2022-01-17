function() {
            d3.select("body").append("div").attr("id", "pie-chart-age");
            var chart = dc.pieChart("#pie-chart-age");
            chart.dimension(valueDimension).group(valueGroup)
                .width(width)
                .height(height)
                .radius(radius)
                .innerRadius(innerRadius)
                .transitionDuration(0);
            chart.render();
            return chart;
        }