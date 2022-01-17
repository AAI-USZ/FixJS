function(){
        line_items_el = $($('.line_items_string')[0])
        finder = RegExp($(this).data("variant-id") + "x\\d+")
        line_items_el.val(line_items_el.val().replace(finder, ""))
        $(this).parents('tr').remove();
        hideOrShowItemTables();
      }