function(i, span) {
          if (!lastSpan || (lastSpan.from != span.from || lastSpan.to != span.to)) {
            towerId++;
          }
          span.towerId = towerId;
          // average distance of arcs (0 for no arcs)
          span.avgDist = span.numArcs ? span.totalDist / span.numArcs : 0;
          lastSpan = span;
        }