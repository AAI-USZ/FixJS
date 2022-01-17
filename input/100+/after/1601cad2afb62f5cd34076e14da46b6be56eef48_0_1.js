function() {
      var selected = $('.item').filter(function(index) { return $(this).find("input[name='share[]']").is(':checked'); })
      // init share modal
      $('.share-item-list tr').remove();
      var st = $('#template-share-item').html();
      $.each(selected, function(i,item) {
        var data = { 'name': $(item).find('.ItemImage').attr('title')};
        data['thumb'] = $(item).find('.ItemImageImg').attr('src')
        $('.share-item-list').append(Mustache.to_html(st, data));
      });

      $('#modal-share').modal();
    }