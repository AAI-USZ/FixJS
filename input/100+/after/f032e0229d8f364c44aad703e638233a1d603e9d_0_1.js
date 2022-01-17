function(clicked) {
        var $item_node = $(clicked).parent();
        var $oid_node = $item_node.parent().parent();
        var $before_node = $oid_node.find('.deformInsertBefore').last();
        var min_len = parseInt($before_node.attr('min_len')||'0');
        var max_len = parseInt($before_node.attr('max_len')||'9999');
        var now_len = parseInt($before_node.attr('now_len')||'0');
        if (now_len > min_len) {
            $before_node.attr('now_len', now_len - 1);
            $item_node.remove();
            deform.processSequenceButtons($oid_node, min_len, max_len, 
                                          now_len-1);
        };
        return false;
    }