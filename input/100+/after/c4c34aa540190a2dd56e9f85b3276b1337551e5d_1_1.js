function set_tags(photoid) {
    var tags = $("#fastedit_tag_"+photoid)
    var target = tags.parents(".info").find("div .tags")
    $.post("Photos?special=FASTEDIT&tagAction=SET&"+tags.serialize(), 
        {id : photoid},
        function(data) {
            // need to ensure that it's OK ...
            var newHtml = ""
            $("#fastedit_tag_"+photoid+" option:selected").each(function() {
                newHtml += $(this).text() + " "
            })
            target.html(newHtml)
            $(".fastedit_tag_bt").click()
        }
     );
}