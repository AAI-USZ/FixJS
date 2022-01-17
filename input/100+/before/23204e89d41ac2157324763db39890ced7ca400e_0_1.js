function() {
        var selectelem = $("<select class='filter_select'><option selected='selected'>---</option><option>and</option><option>not</option></select>");
        var andinput = $("<input name='add_filter' class='input_filter' type='text' placeholder='Filter' />");
        var notinput = $("<input name='not_filter' class='input_filter' type='text' placeholder='Negative Filter' />");
        if ($(this).val() == "---") {
            if ($(this).parent().next().hasClass("add_filter")) {
                return;
            } else {
                $(this).parent().next().remove();
            }
        } else if ($(this).val() == "and") {
            if ($(this).parent().next().length > 0) {
                $(this).parent().next().toggleClass("not_filter and_filter");
                $(this).parent().next().children("input").attr("placeholder", "Filter");
                return;
            }
            $(this).parent().after(
                $("<div class='and_filter' />")
                .append(andinput)
                .append(selectelem)
            );
            $(this).parent().next().prepend($(this));
        } else if ($(this).val() == "not") {
            if ($(this).parent().next().length > 0) {
                $(this).parent().next().toggleClass("not_filter and_filter");
                $(this).parent().next().children("input").attr("placeholder", "Negative Filter");
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