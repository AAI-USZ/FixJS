function() {
      if ($('.sharee-list').html().length == 0) {
        alert("You didn't specifiy any recipients.  Use @ notation to specify a Twitter user.")
        return false;
      }

      var rawSharees = $('.sharee-list').html().split(' ');
      var sharees = rawSharees.map(function(item){ if (item[0] == '@') { return item.substr(1); } else { return item; } })
      var ids = $.makeArray($('.share-item-list').find('td[data-id]').attr('data-id')).join(',')

      $('#modal-share input[id="ids"]').val(ids)
      $('#modal-share input[id="sharees"]').val(sharees)

      $.ajax({
        type: 'POST',
        url: '/shares',
        async: false,
        data: $("#form-share-modal").serialize(),
        error: function() { alert('failed to share!'); },
        dataType: 'json'
      });

      $('#modal-share').modal('hide');
      clearSelectMode();
    }