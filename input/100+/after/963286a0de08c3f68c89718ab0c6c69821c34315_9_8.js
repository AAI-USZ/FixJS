function lists_set_heightTop() {
    lists_get_dimensions();
    if (!extShrinkMode) {
        $('#gui>div').css("height",pageHeight()-headerHeight()-150-40);
        $("#user,#customer,#project,#activity").css("height","160px");
        $("#user_foot, #customer_foot, #project_foot, #activity_foot").css("top",pageHeight()-30);
        $('#userShrink').css("height","211px");
        $('#customerShrink').css("height","211px");
        // push customer/project/activity subtables in place TOP
        var subs = pageHeight()-headerHeight()-90+25;
        $("#user,#customer,#project,#activity").css("top",subs);
        // push faked table heads of subtables in place
        var subs = pageHeight()-headerHeight()-90;    
        $("#user_head,#customer_head,#project_head,#activity_head").css("top",subs);
        $('#extShrink').css("top",subs-10);
        $('#userShrink').css("top",subs);
        $('#customerShrink').css("top",subs);
    } else {
        $("#gui>div").css("height","105px");
        $("#user_head,#customer_head,#project_head,#activity_head").css("top",headerHeight()+107);
        $("#user,#customer,#project,#activity").css("top",headerHeight()+135);
        $("#user,#customer,#project,#activity").css("height",pageHeight()-headerHeight()-165);
        $('#customerShrink').css("height",pageHeight()-headerHeight()-110);
        $('#userShrink').css("height",pageHeight()-headerHeight()-110);
        $('#extShrink').css("top",headerHeight()+97);
        $('#customerShrink').css("top",headerHeight()+105);
        $('#userShrink').css("top",headerHeight()+105);
    }
    
    lists_set_TableWidths();
}