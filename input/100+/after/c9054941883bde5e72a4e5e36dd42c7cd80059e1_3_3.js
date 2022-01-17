function() {
        var graph = KhanUtil.currentGraph;
        var points = KhanUtil.currentGraph.graph.points;
        var mean = KhanUtil.mean($.map(points, function(el) { return el.coord[0]; }));
        var stddev = KhanUtil.stdDev($.map(points, function(el) { return el.coord[0]; }));

        mean = KhanUtil.roundTo(1, mean);
        stddev = KhanUtil.roundTo(1, stddev);

        graph.graph.stddevLeft.translate(((mean) * graph.scale[0]) - graph.graph.stddevLeft.attr("translation").x, 0);
        graph.graph.stddevRight.translate(((mean + stddev) * graph.scale[0]) - graph.graph.stddevRight.attr("translation").x, 0);
        graph.graph.stddevLine.translate(((mean) * graph.scale[0]) - graph.graph.stddevLine.attr("translation").x, 0);
        graph.graph.stddevLine.scale(stddev, 1, graph.graph.stddevLine.attr("path")[0][1], graph.graph.stddevLine.attr("path")[0][2]);

        graph.graph.stddevValueLabel.remove();
        graph.graph.stddevValueLabel = graph.label([stddev / 2 + mean, -1.3], "s \\approx " + stddev, "below", { color: KhanUtil.GREEN });

        if (stddev > 0) {

            graph.style({ strokeWidth: 2, stroke: "#bbb", fill: null, "plot-points": 100 }, function() {
                graph.graph.pdf.remove();
                graph.graph.pdf = graph.plot(function(x) {
                    return KhanUtil.gaussianPDF(mean, stddev, x) * 5 - 0.2;
                }, [-7, 7]).toBack();
            });

            graph.style({ strokeWidth: 2, stroke: KhanUtil.BLUE, fill: null }, function() {
                graph.graph.meanLine.remove();
                graph.graph.meanLine = graph.line([mean, -0.2], [mean, KhanUtil.gaussianPDF(mean, stddev, mean) * 5 - 0.2]).toBack();
            });

            graph.graph.meanValueLabel.remove();
            graph.graph.meanValueLabel = graph.label(
                [mean, KhanUtil.gaussianPDF(mean, stddev, mean) * 5 - 0.2],
                "\\bar{x} \\approx " + mean, "above", { color: KhanUtil.BLUE }
            );

            var points = [];

            points.push([mean - stddev, -0.2]);
            points.push([mean - stddev, KhanUtil.gaussianPDF(mean, stddev, mean - stddev) * 5 - 0.2]);
            var step = stddev / 50;
            for (var x = mean - stddev; x <= mean + stddev; x += step) {
                points.push([x, KhanUtil.gaussianPDF(mean, stddev, x) * 5 - 0.2]);
            }
            points.push([mean + stddev, KhanUtil.gaussianPDF(mean, stddev, mean + stddev) * 5 - 0.2]);
            points.push([mean + stddev, -0.2]);

            graph.style({ strokeWidth: 0, stroke: null, fill: KhanUtil.GREEN, opacity: 0.3 }, function() {
                graph.graph.stddevArea.remove();
                graph.graph.stddevArea = graph.path(points).toBack();
            });

        } else {
            graph.graph.pdf.remove();
            graph.graph.pdf = KhanUtil.bogusShape;
        }


        graph.graph.mean = mean;
        graph.graph.stddev = stddev;
    }