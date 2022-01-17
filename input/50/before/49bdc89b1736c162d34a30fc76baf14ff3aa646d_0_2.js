function(item){
                item = $(item);
                to_ret[item.data('node_id')] = {text:item.parent().text(),
                                                next_id:item.data('next_node_id')};
            }