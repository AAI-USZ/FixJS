function(index, coordY) {
        var graph = KhanUtil.currentGraph;
        var answer = KhanUtil.ddx(KhanUtil.points[index]);
        var degreesOff = Math.abs(Math.atan(answer * graph.scale[1] / graph.scale[0]) -
                Math.atan(coordY * graph.scale[1] / graph.scale[0])) * (180 / Math.PI);

        // How far off you're allowed to be
        if (degreesOff < 7) {
            coordY = answer;
        }

        $($("div#solutionarea :text")[index]).val(KhanUtil.roundTo(2, coordY));
        $($("div#solutionarea .answer-label")[index]).text(KhanUtil.roundTo(2, coordY));
        graph.tangentLines[index].rotate(-Math.atan(coordY * (graph.scale[1] / graph.scale[0])) * (180 / Math.PI), true);
        graph.slopePoints[index].attr("cy", (graph.range[1][1] - coordY) * graph.scale[1]);
        graph.mouseTargets[index].attr("cy", (graph.range[1][1] - coordY) * graph.scale[1]);
    }