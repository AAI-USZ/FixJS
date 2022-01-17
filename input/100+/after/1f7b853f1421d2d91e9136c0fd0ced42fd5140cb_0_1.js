function() {
        var selectelem = $("<select class='filter_select'><option selected='selected'>---</option><option>and</option><option>not</option></select>");
        var andinput = $("<input name='add_filter' class='input_filter' type='text' placeholder='Filter' />");
        var notinput = $("<input name='not_filter' class='input_filter' type='text' placeholder='Negative Filter' />");
        if ($(this).val() == "---") {
            if ($(this).parent().children("select").length == 2) {
                $(this).parent().prev().append($(this));
                $(this).parent().next().remove();
            } else {
                $(this).parent().remove();
            }
        } else if ($(this).val() == "and") {
            if ($(this).next().length > 0) {
                $(this).parent().toggleClass("not_filter and_filter");
                $(this).next().attr("placeholder", "Filter");
                return;
            }
            $(this).parent().after(
                $("<div class='and_filter' />")
                .append(andinput)
                .append(selectelem)
            );
            $(this).parent().next().prepend($(this));
        } else if ($(this).val() == "not") {
            if ($(this).next().length > 0) {
                $(this).parent().toggleClass("not_filter and_filter");
                $(this).next().attr("placeholder", "Negative Filter");
                return;
            }
            $(this).parent().after(
                $("<div class='not_filter' />")
                .append(notinput)
                .append(selectelem)
            );
            $(this).parent().next().prepend($(this));
        }
    }