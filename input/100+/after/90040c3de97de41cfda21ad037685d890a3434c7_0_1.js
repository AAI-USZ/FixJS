function (i, val) {
        if (table_name.length > 0) {
            var id = table_name + "_" + i;
        } else {
            var id = i;
        }


        var input = form.find("input#" + id + "," + "textarea#" + id);
        //console.log(input)
        var err_text = "";
        jQuery.each(val, function (error_i, error_val) {
            if (err_text != "") {
                err_text += ", ";
            }
            err_text += error_val;
        });

        var err_span = '<span class="help-inline">' + err_text + '</span>';
        input.after(err_span);
        input.parents(".control-group").addClass("error");

        if (i == "base") {
            alert(err_text);
        }
    }