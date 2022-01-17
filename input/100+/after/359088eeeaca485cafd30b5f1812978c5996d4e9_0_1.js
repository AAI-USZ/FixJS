function() {
        if ($(this).val() == "---") {
            console.log($(this).next());
            return;
        } else if ($(this).val() == "AND") {
            $(this).prev().after($("<input name='add_filter' class='and_filter' type='text' placeholder='Filter' />"));
        } else if ($(this).val() == "NOT") {
            $(this).prev().after($("<input name='not_filter' class='not_filter' type='text' placeholder='Negative Filter' />"));
        }
        console.log("filter_select changed to", $(this).val());
    }