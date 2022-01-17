function lists_set_left() {
    
    // push pct/evt subtables in place LEFT

    leftmargin=0;
    rightmargin=0;
    usrShrinkPos=0;
    if (usrShrinkMode==0) {
      leftmargin+=subtableWidth;
      rightmargin+=7;
      usrShrinkPos+=subtableWidth+7;
    }

    $("#knd, #knd_head, #knd_foot").css("left",leftmargin+rightmargin+10);
    $('#usrShrink').css("left",usrShrinkPos);
    
    kndShrinkPos=usrShrinkPos;

    if (kndShrinkMode==0) {
      leftmargin+=subtableWidth;
      rightmargin+=7;
      kndShrinkPos+=subtableWidth+7;
    }

    $("#pct, #pct_head, #pct_foot").css("left",leftmargin+rightmargin+10);
    
    $("#evt, #evt_head, #evt_foot").css("left",subtableWidth+leftmargin+rightmargin+15); //22
    $('#kndShrink').css("left",kndShrinkPos);
    
}