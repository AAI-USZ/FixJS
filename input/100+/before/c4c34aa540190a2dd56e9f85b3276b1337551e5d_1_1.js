function add_rm_tag(photoid, tagact) {
    var tagid = $("#fastedit_tag_"+photoid).val()
    if (tagid == null || tagid < 0) {
        alert("No tag selected ...")
        return
    }
    
    $.post("Photos?special=FASTEDIT&"+$("#fastedit_tag_"+photoid).serialize(), 
        {id : photoid, tagAction:tagact, tags:tagid},
        function(data) {
            reload_page_cb(data, photoid);
        }
     );
}