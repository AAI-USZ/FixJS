function _search( e )
    {
        e.preventDefault();
        var box = $( this.parentNode.parentNode.parentNode ), text = box.find('input.ezobject-relation-search-text');
        if ( text.val() )
        {
            var params = { 'CallbackID': box.attr('id'), 'EncodingFetchSection': 1 };
            var node = box.find("*[name*='_for_object_start_node']"), classes = box.find("input[name*='_for_object_class_constraint_list']");
            if ( node.size() ) params['SearchSubTreeArray'] = node.val();
            if ( classes.size() ) params['SearchContentClassIdentifier'] = classes.val();
            $.ez( 'ezjsc::search::' + text.val(), params, _searchCallBack );
        }
        return false;
    }