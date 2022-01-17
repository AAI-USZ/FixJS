function(html, args){
        if (!args || args === sliding_tree.get_current_crumb()){
            parent.children('.will_have_content').html(html);
        }
    }