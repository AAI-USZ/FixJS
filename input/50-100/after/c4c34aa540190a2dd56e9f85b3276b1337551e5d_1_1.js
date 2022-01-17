function () {
        var id = $(this).attr('rel');
        $("#desc_"+id).toggle("fast")
        $("#fastedit_div_desc_"+id).toggle("fast")
        $("#fastedit_div_desc_"+id).parents(".edit").toggleClass("edit_visible")
    }