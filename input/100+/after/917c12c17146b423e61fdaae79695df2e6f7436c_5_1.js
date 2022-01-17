function() {
        var selectelem = $("<select class='filter_select'><option selected='selected'>---</option><option>and</option><option>not</option><option>size</option></select>");
        var andinput = $("<input name='add_filter' class='input_filter positive' type='text' placeholder='Positive Filter' />");
        var notinput = $("<input name='not_filter' class='input_filter negative' type='text' placeholder='Negative Filter' />");
        var sizeinput = $("<input class='input_filter size lower' type='number' placeholder='Lower' min=0 /> \
                                <select> \
                                    <option value=1073741824>GB</option> \
                                    <option value=1048576>MB</option> \
                                    <option value=1024>KB</option> \
                                    <option value=1>B</option> \
                                </select> \
                            <input class='input_filter size upper' type='number' placeholder='Upper' min=0 /> \
                                <select> \
                                    <option value=1073741824>GB</option> \
                                    <option value=1048576>MB</option> \
                                    <option value=1024>KB</option> \
                                    <option value=1>B</option> \
                                </select>");
        if ($(this).val() == "---") {
            if ($(this).parent().children("select").length == 2 || $(this).parent().children("select").length == 4) {
                $(this).parent().prev().append($(this));
                $(this).parent().next().remove();
            } else {
                $(this).parent().remove();
            }
        } else if ($(this).val() == "and") {
            if ($(this).next().length > 0) {
                if ( $(this).parent().hasClass("size_filter") ) {
                    $(this).next().replaceWith(andinput);
                    for (i=0; i<3; i++) {
                        $(this).next().next().remove();
                    }
                }
                $(this).parent().removeClass("not_filter size_filter");
                $(this).parent().addClass("and_filter");
                $(this).next().attr("placeholder", "Positive Filter");
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
                if ( $(this).parent().hasClass("size_filter") ) {
                    $(this).next().replaceWith(notinput);
                    for (i=0; i<3; i++) {
                        $(this).next().next().remove();
                    }
                }
                $(this).parent().removeClass("and_filter size_filter");
                $(this).parent().addClass("not_filter");
                $(this).next().attr("placeholder", "Negative Filter");
                return;
            }
            $(this).parent().after(
                $("<div class='not_filter' />")
                .append(notinput)
                .append(selectelem)
            );
            $(this).parent().next().prepend($(this));
        } else if ($(this).val() == "size") {
            if ($(this).next().length > 0) {
                $(this).parent().removeClass("and_filter not_filter");
                $(this).parent().addClass("size_filter");
                $(this).next().remove();
                $(this).after(sizeinput);
                return;
            }
            $(this).parent().after(
                $("<div class='size_filter' />")
                .append(sizeinput)
                .append(selectelem)
            );
            $(this).parent().next().prepend($(this));
        }
    }