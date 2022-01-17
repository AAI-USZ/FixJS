function setupMeF() {
        if (zebra.isIE) {
            var de = document.documentElement, db = document.body;
            meX = function meX(e, d) { return d.graph.tX(e.clientX - d.offx + de.scrollLeft + db.scrollLeft, 
                                                         e.clientY - d.offy + de.scrollTop  + db.scrollTop);  }
            meY = function meY(e, d) { 
                return d.graph.tY(e.clientX - d.offx + de.scrollLeft + de.scrollLeft,
                                  e.clientY - d.offy + de.scrollTop + db.scrollTop);  }
        }
        else {
            meX = function meX(e, d) {  return d.graph.tX(e.pageX - d.offx, e.pageY - d.offy); }
            meY = function meY(e, d) {  return d.graph.tY(e.pageX - d.offx, e.pageY - d.offy); }
        }
    }