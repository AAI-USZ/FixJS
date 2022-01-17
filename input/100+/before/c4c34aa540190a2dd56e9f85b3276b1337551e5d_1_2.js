function init_fastedit() {
    $(".fastedit_tag_bt").click(function () {
        var id = $(this).attr('rel');
        $("#fastedit_div_tag_"+id).toggle("fast")
        $("#fastedit_div_tag_"+id).parent(".edit").toggleClass("edit_visible")
    }) ;
    $(".fastedit_desc_bt").click(function () {
        var id = $(this).attr('rel');
        $("#desc_"+id).toggle("fast")
        $("#fastedit_div_desc_"+id).toggle("fast")
        $("#fastedit_div_desc_"+id).parent(".edit").toggleClass("edit_visible")
    }) ;
    $(".fastedit_stars").click(function () {
        var photoid = $(this).attr('rel').split('/')[0];
        var stars = $(this).attr('rel').split('/')[1];

        set_stars(photoid, parseInt(stars))
        $(this).prevAll("img").removeClass("star_off").addClass("star_on")
        $(this).removeClass("star_off").addClass("star_on")
        $(this).nextAll("img").removeClass("star_on").addClass("star_off")
    }) ;

    $(".fastedit_addtag").click(function () {
        var photoid = $(this).attr('rel');
        add_rm_tag(photoid, "ADD")
    }) ;

    $(".fastedit_rmtag").click(function () {
        var photoid = $(this).attr('rel');
        add_rm_tag(photoid, "RM")
    }) ;

    $(".fastedit_desc").click(function () {
        var photoid = $(this).attr('rel');
        var photodesc = $("#fastedit_desc_"+photoid).val()

        $.post("Photos?special=FASTEDIT", 
            {id : photoid, desc:photodesc},
            function(data) {
                reload_page_cb(data, photoid);
            }
         );
    }) ;
    $(".fastedit_tag").attr("multiple", "true")
    $(".fastedit_tag option").each(function() {
        if ($(this).val() == -1)
           $(this).remove()
    })
    $(".fastedit_tag").chosen();
    
}