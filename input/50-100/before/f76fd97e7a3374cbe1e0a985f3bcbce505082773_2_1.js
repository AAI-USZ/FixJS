function(){
            var selected = path_selector.find('input:checked'),
                to_ret = {};

            KT.utils.each(selected, function(item){
                item = $(item);
                to_ret[item.data('node_id')] = { 'id' : item.data('node_id'), name:item.data('node_name'),
                            next_id:item.data('next_node_id')};
            });
            return to_ret;
        }