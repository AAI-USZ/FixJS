function(){
        var $container = $(this).parents('.promotion_action');
        var $hiddenField = $container.find("input[type='hidden']");
        var $row = $(this).parents('tr');
        var index = $row.parents('table').find('tr').index($row.get(0));
        // Remove variant_id quantity pair from the string
        var items = _($hiddenField.val().split(',')).compact();
        items.splice(index - 1, 1);
        $hiddenField.val(items.join(','));
        $(this).parents('tr').remove();
        hideOrShowItemTables();
      }