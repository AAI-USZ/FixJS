function() {
      $('.option-tree-ui-radio-image').live('click', function() {
        $('.option-tree-ui-radio-image').removeClass('option-tree-ui-radio-image-selected');
        $(this).toggleClass('option-tree-ui-radio-image-selected');
        $(this).parent().find('.option-tree-ui-radio').attr('checked', true);
      });
    }