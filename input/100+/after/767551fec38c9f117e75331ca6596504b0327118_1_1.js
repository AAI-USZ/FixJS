function() {
        var field = $(this).closest('.markdown-field').parent().find('textarea');
        var action = $(this).attr('id').split('-')[1];
        var field_id = $(field).attr('id');
        var preview_id = field_id + "-preview-block";
        var control = $(field).parent();
        var write = $("#"+field_id+"-write");
        var preview = $("#"+field_id+"-preview");
        if (action=="write") {
            if ($('#'+preview_id).length > 0) {
                $('#'+preview_id).hide();
                $('#'+preview_id).children().remove();
            }
            $(control).show();
            $(write).attr('class', 'button-selected');
            $(preview).attr('class', 'button');
        } else if (action=="preview") {
            if ($(field).val() == "") {
                var html_text = $('<p>').html("Nothing to preview");
            } else {
                var html_text = $(converter.makeHtml($(field).val()));
            }
            $(preview).attr('class', 'button-selected');
            $(write).attr('class', 'button');
            if ($('#'+preview_id).length == 0) {
                var preview_control = $('<div>').attr('class', 'preview-control');
                var preview = $('<div>').attr('id', preview_id).attr('class', 'preview-block');
                $(preview).append(html_text);
                $(preview_control).append(preview);
                $(control).parent().append(preview_control);
                $(control).hide();
            } else {
                $(control).hide();
                $('#'+preview_id).children().remove();
                $(html_text).appendTo($('#'+preview_id));
                $('#'+preview_id).show();
            }
        }
    }