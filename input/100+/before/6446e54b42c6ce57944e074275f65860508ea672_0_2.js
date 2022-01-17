function(median) {
        var graph = KhanUtil.currentGraph;

        graph.graph.medianArrow.translate((median * graph.scale[0]) - graph.graph.medianArrow.attr("translation").x, 0);
        graph.graph.medianValueLabel.remove();
        graph.graph.medianValueLabel = graph.label([median, -1.2],
            (median + "").replace(/-(\d)/g, "\\llap{-}$1"),
            "below",
            { color: KhanUtil.GREEN }
        );

        graph.graph.medianLabel.remove();
        graph.graph.medianLabel = graph.label([median, -1.7], "\\text{median}", "below", { color: KhanUtil.GREEN });

        graph.graph.median = median;
    }