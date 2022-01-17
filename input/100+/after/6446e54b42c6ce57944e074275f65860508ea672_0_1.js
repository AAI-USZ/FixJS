function(mean) {
        var graph = KhanUtil.currentGraph;

        $(graph.graph.meanValueLabel).html(mean).tmpl();

        graph.graph.meanArrow.transform("T"+(mean * graph.scale[0])+","+0);
        graph.graph.meanValueLabel.remove();
        graph.graph.meanValueLabel = graph.label([mean, 0.8],
            (mean + "").replace(/-(\d)/g, "\\llap{-}$1"),
            "above",
            { color: KhanUtil.BLUE }
        );

        graph.graph.meanLabel.remove();
        graph.graph.meanLabel = graph.label([mean, 1.3], "\\text{mean}", "above", { color: KhanUtil.BLUE });

        graph.graph.mean = mean;
    }