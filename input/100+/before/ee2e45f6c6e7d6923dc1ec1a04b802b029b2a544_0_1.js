function attachItemActions() {
      $('.item').hover(
        function(e) {
          $(this).find('.item-actions').filter(function(index) { return !$(this).find("input[name='share[]']").is(':checked'); }).show();
        },
        function(e) {
          $(this).find('.item-actions').filter(function(index) { return !$(this).find("input[name='share[]']").is(':checked'); }).hide();
        }
      );
    }