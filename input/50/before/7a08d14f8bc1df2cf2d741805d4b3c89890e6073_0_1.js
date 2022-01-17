function () {
        $("hastheword[refid='" + id + "']").html($('textarea#edit').val());
        $("hastheword[refid='" + id + "']").addClass("edited");
    }