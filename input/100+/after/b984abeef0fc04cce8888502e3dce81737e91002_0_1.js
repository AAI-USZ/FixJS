function() {
        chart.resetSvg();

        if (chart.dataAreSet()) {
            var topG = chart.generateSvg()
                .append("g")
                .attr("transform", "translate(" + chart.cx() + "," + chart.cy() + ")");

            dataPie = calculateDataPie();

            arc = chart.buildArcs();

            slices = chart.drawSlices(topG, dataPie, arc);

            chart.drawLabels(slices, arc);

            chart.highlightFilter();
        }

        return chart;
    }