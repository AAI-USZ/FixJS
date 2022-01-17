function(html, args){
        if (!args || args === sliding_tree.get_current_crumb()){
            parent.children('.has_content').html(html);
        }
    }