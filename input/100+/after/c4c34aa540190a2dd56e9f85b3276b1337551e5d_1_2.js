function() {
        var list = $(this).find(".fastedit_tag")
        $(this).find(".tag_link").each(function() {
            list.find("option[value = '"+$(this).attr("rel")+"']").attr("selected", "true")
        })
    }