function() {
        if ($(this).val() == "---") {
            if ($(this).prev().hasClass("add_filter")) {
                return;
            } else {
                $(this).prev().remove();
            }
        } else if ($(this).val() == "AND") {
            $(this).prev().after($("<input name='add_filter' class='and_filter input_filter' type='text' placeholder='Filter' />"));
        } else if ($(this).val() == "NOT") {
            $(this).prev().after($("<input name='not_filter' class='not_filter input_filter' type='text' placeholder='Negative Filter' />"));
        }
        console.log("filter_select changed to", $(this).val());
    }