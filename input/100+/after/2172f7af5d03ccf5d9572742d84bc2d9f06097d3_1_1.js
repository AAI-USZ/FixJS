function(a, b) {
        var aSpan = a.span;
        var bSpan = b.span;
        // longer arc distances go last
        var tmp = aSpan.avgDist - bSpan.avgDist;
        if (tmp) {
          return tmp < 0 ? -1 : 1;
        }
        // spans with more arcs go last
        var tmp = aSpan.numArcs - bSpan.numArcs;
        if (tmp) {
          return tmp < 0 ? -1 : 1;
        }
        // compare the span widths,
        // put wider on bottom so they don't mess with arcs, or shorter
        // on bottom if there are no arcs.
        var ad = a.to - a.from;
        var bd = b.to - b.from;
        tmp = ad - bd;
        if(aSpan.numArcs == 0 && bSpan.numArcs == 0) {
          tmp = -tmp;
        } 
        if (tmp) {
          return tmp < 0 ? 1 : -1;
        }
        tmp = aSpan.refedIndexSum - bSpan.refedIndexSum;
        if (tmp) {
          return tmp < 0 ? -1 : 1;
        }
        // if no other criterion is found, sort by type to maintain
        // consistency
        // TODO: isn't there a cmp() in JS?
        if (aSpan.type < bSpan.type) {
          return -1;
        } else if (aSpan.type > bSpan.type) {
          return 1;
        }

        return 0;
      }