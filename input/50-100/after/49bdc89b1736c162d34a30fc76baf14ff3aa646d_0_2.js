function(node, next){
        var html = '',
            next_node =  next  ? ('data-next_node_id="' + next.id + '"') : '',
            input = node.select ? '<span class="checkbox_holder"><input class="node_select" type="checkbox" ' +
                next_node +' data-node_id="' + node.id + '" data-node_name="' + node.name + '"></span>' : '';

        html += '<li data-node_id="' + node.id + '">'+ '<label><div>' + input +  node.name +  '</div></label></li>';
        return html;
    }