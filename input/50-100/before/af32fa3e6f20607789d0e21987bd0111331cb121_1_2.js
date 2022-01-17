function(pairKey) {
    var self = this;
    self.add({id: pairKey, user: self.user, domain: self.domain.id});
    $.ajax({
      url: self.putUrl(pairKey),
      type: 'PUT'
    });
  }