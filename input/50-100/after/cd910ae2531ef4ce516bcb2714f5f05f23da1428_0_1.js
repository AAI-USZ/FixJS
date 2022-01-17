function() {
      var selected = $('.item').filter(function(index) { return $(this).find("input[name='share[]']").is(':checked'); })
      resetShareModal();
      var st = $('#template-share-item').html();
      $.each(selected, function(i,item) { addToShareList(item, st) });
      $('#modal-share').modal();
    }