function(request, sender, sendResponse) {
    if (request.type && request.type == 'inboxDataAvailable') {
      self.updateDOM();
    } else if (request.type && request.type == 'statusMessageUpdate') {
      if (request.msg) {
        if (!self.isEditingStatus)
          $('#head-col2-row1').text(request.msg);
        else
          self.statusToSetOnCancel = request.msg;
      }
    }

    if (request.type && sendResponse) sendResponse();
  }