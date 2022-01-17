function(item){
                item = $(item);
                to_ret.push({id: item.data('node_id'), text:item.data('node_name'),
                            next_id:item.data('next_node_id')});
            }