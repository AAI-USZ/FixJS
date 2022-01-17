function lists_knd_prefilter(knd,type) {
    if (type=="highlight") {
        
        $(".knd").removeClass("filterPctForPreselection");
        $(".pct").removeClass("filterPctForPreselection");
        $("#pct .knd"+knd).addClass("filterPctForPreselection");
        $("#pct .pct").removeClass("TableRowInvisible");

        
    } else {
        
        $(".knd").removeClass("filterPctForPreselection");      
        $(".pct").removeClass("filterPctForPreselection");
        $("#knd .knd"+knd).addClass("filterPctForPreselection");
        $("#pct .pct").removeClass("highlightPctForPreselection");
        if (knd > 0) {
          $("#pct .pct").addClass("TableRowInvisible");
          $("#pct .knd"+knd).removeClass("TableRowInvisible");
        }
        else {
          $("#pct .pct").removeClass("TableRowInvisible");
        }
        
    }
}