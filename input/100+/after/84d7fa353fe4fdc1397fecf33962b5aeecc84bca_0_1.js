function() {
        var selectelem = $("<select><option selected='selected'>---</option><option>AND</option><option>NOT</option></select>");
        if ($(this).val() == "---") {
            if ($(this).parent().next().hasClass("add_filter")) {
                return;
            } else {
                $(this).parent().next().remove();
            }
        } else if ($(this).val() == "AND") {
            $(this).parent().after($("<div class='and_filter'><input name='add_filter' class='input_filter' type='text' placeholder='Filter' /></div>").append(selectelem));
        } else if ($(this).val() == "NOT") {
            $(this).parent().after($("<div class='not_filter'><input name='not_filter' class='not_filter input_filter' type='text' placeholder='Negative Filter' /></div>").append(selectelem));
        }
        console.log("filter_select changed to", $(this).val());
    }