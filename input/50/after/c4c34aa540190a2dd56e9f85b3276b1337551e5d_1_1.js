function () {
        var id = $(this).attr('rel');
        $("#fastedit_div_tag_"+id).toggle("fast")
        $("#fastedit_div_tag_"+id).parents(".edit").toggleClass("edit_visible")
    }