function lists_set_left() {
    
    // push project/activity subtables in place LEFT

    leftmargin=0;
    rightmargin=0;
    userShrinkPos=0;
    if (userShrinkMode==0) {
      leftmargin+=subtableWidth;
      rightmargin+=7;
      userShrinkPos+=subtableWidth+7;
    }

    $("#customer, #customer_head, #customer_foot").css("left",leftmargin+rightmargin+10);
    $('#userShrink').css("left",userShrinkPos);
    
    customerShrinkPos=userShrinkPos;

    if (customerShrinkMode==0) {
      leftmargin+=subtableWidth;
      rightmargin+=7;
      customerShrinkPos+=subtableWidth+7;
    }

    $("#project, #project_head, #project_foot").css("left",leftmargin+rightmargin+10);
    
    $("#activity, #activity_head, #activity_foot").css("left",subtableWidth+leftmargin+rightmargin+15); //22
    $('#customerShrink').css("left",customerShrinkPos);
    
}