function mouseup(e) {
    var lscene = scene;
    if(lscene){
        var lmark = lscene.mark;
        if(lmark){
            pv.Mark.dispatch("selectend", lscene, index, e);
        
            lmark.selectionRect = null;
        }
        
        scene = null;
    }
  }