function(a, b) {
        // longer arc distances go last
        var tmp = a.avgDist - b.avgDist;
        if (tmp) {
          return tmp < 0 ? -1 : 1;
        }
        // spans with more arcs go last
        var tmp = a.numArcs - b.numArcs;
        if (tmp) {
          return tmp < 0 ? -1 : 1;
        }
        // compare the span widths,
        // put wider on bottom so they don't mess with arcs, or shorter
        // on bottom if there are no arcs.
        var ad = a.to - a.from;
        var bd = b.to - b.from;
        tmp = ad - bd;
        if(a.numArcs == 0 && b.numArcs == 0) {
          tmp = -tmp;
        } 
        if (tmp) {
          return tmp < 0 ? 1 : -1;
        }
        tmp = a.refedIndexSum - b.refedIndexSum;
        if (tmp) {
          return tmp < 0 ? -1 : 1;
        }
        // if no other criterion is found, sort by type to maintain
        // consistency
        // TODO: isn't there a cmp() in JS?
        if (a.type < b.type) {
          return -1;
        } else if (a.type > b.type) {
          return 1;
        }

        return 0;
      }