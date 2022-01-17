function(event) {
            event.preventDefault();
            var graph = KhanUtil.currentGraph;
            if (event.type === "vmouseover") {
                KhanUtil.highlight = true;
                if (!KhanUtil.dragging) {
                    graph.slopePoints[index].animate({ scale: 2 }, 50);
                    graph.tangentLines[index].animate({ "stroke": KhanUtil.DDX_COLOR }, 100);
                }

            } else if (event.type === "vmouseout") {
                KhanUtil.highlight = false;
                if (!KhanUtil.dragging) {
                    graph.slopePoints[index].animate({ scale: 1 }, 50);
                    graph.tangentLines[index].animate({ "stroke": KhanUtil.TANGENT_COLOR }, 100);
                }

            } else if (event.type === "vmousedown" && (event.which === 1 || event.which === 0)) {
                event.preventDefault();
                graph.tangentLines[index].toFront();
                graph.tangentPoints[index].toFront();
                graph.slopePoints[index].toFront();
                graph.tangentLines[index].animate({ scale: KhanUtil.TANGENT_GROWTH_FACTOR }, 200);
                KhanUtil.dragging = true;

                $(document).bind("vmousemove vmouseup", function(event) {
                    event.preventDefault();

                    // mouseY is in pixels relative to the SVG; coordY is the scaled y-coordinate value
                    var mouseY = event.pageY - $("#ddxplot").offset().top;
                    mouseY = Math.max(10, Math.min(graph.ypixels - 10, mouseY));
                    var coordY = graph.range[1][1] - mouseY / graph.scale[1];

                    if (event.type === "vmousemove") {
                        $($("div#solutionarea :text")[index]).val(KhanUtil.roundTo(2, coordY));
                        $($("div#solutionarea .answer-label")[index]).text(KhanUtil.roundTo(2, coordY));
                        graph.tangentLines[index].rotate(-Math.atan(coordY * (graph.scale[1] / graph.scale[0])) * (180 / Math.PI), true);
                        graph.slopePoints[index].attr("cy", mouseY);
                        graph.mouseTargets[index].attr("cy", mouseY);

                    } else if (event.type === "vmouseup") {
                        $(document).unbind("vmousemove vmouseup");

                        KhanUtil.setSlope(index, coordY);

                        KhanUtil.dragging = false;

                        graph.tangentLines[index].animate({ scale: 1 }, 200);
                        if (!KhanUtil.highlight) {
                            graph.slopePoints[index].animate({ scale: 1 }, 200);
                            graph.tangentLines[index].animate({ "stroke": KhanUtil.TANGENT_COLOR }, 100);
                        }

                        // If all the points are in the right place, reveal the derivative function
                        var answers = $.map($("div#solutionarea .answer-label"), function(x) {
                            return parseFloat($(x).text());
                        });
                        var correct = $.map(KhanUtil.points, function(x) {
                            return KhanUtil.roundTo(2, KhanUtil.ddx(x));
                        });
                        if (answers.join() === correct.join()) {
                            KhanUtil.revealDerivative(400);
                        }
                    }
                });
            }
        }