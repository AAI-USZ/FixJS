function () {
        $(tagname + "[refid='" + id + "']").html($('textarea#edit').val());
        $(tagname + "[refid='" + id + "']").addClass("edited");
    }