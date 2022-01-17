function updateActionsSidebar(){
    if (!is_loading){
        var func = function(html){
            if (typeof(html) != "string")
                html = html.responseText;
            if (html == "")
                return;
            $(".sidebar .nav-list .action_list_item:first").before(html);
            $(".sidebar .nav-list .action_list_item").slice(showed_actions).each(function(){
                $(this).remove();
            });
            last_action_id = $(".sidebar .nav-list .action_list_item").attr("id").split("_")[1];
        }
        $.ajax({
            type: "GET",
            url: ajax_url + "/last_actions",
            data: $.param({
                'last_id': last_action_id, 
            }),
            success: func,
            error: func
        });
    }
     
}