function() {
      $('.option-tree-ui-select').each(function () {
        $(this).wrap('<div class="select-wrapper" />');
        $(this).parent('.select-wrapper.').prepend('<span>' + $(this).find('option:selected').text() + '</span>')
      });
      $('.option-tree-ui-select').live('change', function () {
        $(this).prev('span').replaceWith('<span>' + $(this).find('option:selected').text() + '</span>');
      });
      $('.option-tree-ui-select').bind($.browser.msie ? 'click' : 'change', function(event) {
        $(this).prev('span').replaceWith('<span>' + $(this).find('option:selected').text() + '</span>');
      });
    }