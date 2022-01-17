function lists_customer_prefilter(customer,type) {
    if (type=="highlight") {
        
        $(".customer").removeClass("filterProjectForPreselection");
        $(".project").removeClass("filterProjectForPreselection");
        $("#project .customer"+customer).addClass("filterProjectForPreselection");
        $("#project .project").removeClass("TableRowInvisible");

        
    } else {
        
        $(".customer").removeClass("filterProjectForPreselection");      
        $(".project").removeClass("filterProjectForPreselection");
        $("#customer .customer"+customer).addClass("filterProjectForPreselection");
        $("#project .project").removeClass("highlightProjectForPreselection");
        if (customer > 0) {
          $("#project .project").addClass("TableRowInvisible");
          $("#project .customer"+customer).removeClass("TableRowInvisible");
        }
        else {
          $("#project .project").removeClass("TableRowInvisible");
        }
        
    }
}