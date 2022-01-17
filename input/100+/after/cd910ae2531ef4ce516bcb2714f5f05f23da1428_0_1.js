function attachItemActions(item) {
      $(item).hover(
        function(e) {
          $(this).find('.item-actions').filter(function(index) { return !$(this).find("input[name='share[]']").is(':checked'); }).show();
        },
        function(e) {
          $(this).find('.item-actions').filter(function(index) { return !$(this).find("input[name='share[]']").is(':checked'); }).hide();
        }
      );

      $(item).find('.item-share').click(function(e) {
        resetShareModal();
        addToShareList($(this).closest('.item'));
        $('#modal-share').modal({})
      })
    }