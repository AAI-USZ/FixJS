function(item){
                var data = $(item).data();
                if(!options.link_first || to_ret[data.node_id] === undefined){
                    to_ret[data.node_id] = { 'id' : data.node_id, name:data.node_name,
                            next_id:data.next_node_id};
                }
            }