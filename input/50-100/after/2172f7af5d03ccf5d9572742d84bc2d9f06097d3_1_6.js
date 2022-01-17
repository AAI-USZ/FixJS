function(spanId, span) {
          // calculate average arc distances
          // average distance of arcs (0 for no arcs)
          span.avgDist = span.numArcs ? span.totalDist / span.numArcs : 0;
          lastSpan = span;

          // collect fragment texts into span texts
          var fragmentTexts = [];
          $.each(span.fragments, function(fragmentNo, fragment) {
            // TODO heuristics
            fragmentTexts.push(fragment.text);
          });
          span.text = fragmentTexts.join(' ');
        }