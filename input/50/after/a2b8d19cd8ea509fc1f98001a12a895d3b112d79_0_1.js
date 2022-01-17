function (guest) {
    $.post('/admin/endpoints/markcoming', { InvitationId: guest.InvitationId }, function (data) {
      self.refresh();
    });
  }