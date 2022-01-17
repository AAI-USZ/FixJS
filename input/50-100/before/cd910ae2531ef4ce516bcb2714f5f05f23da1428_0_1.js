function(e) {
      resetShareModal();
      addToShareList($(this).closest('.item'));
      $('#modal-share').modal({})
    }