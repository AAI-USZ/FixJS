function() {
    eLazy.expect_event('sent');
    replyComposer.body = expectedReplyBody =
      'This bit is new!' + replyComposer.body;
    replyComposer.finishCompositionSendMessage(function(err, badAddrs) {
      if (err)
        eLazy.error(err);
      else
        eLazy.event('sent');
    });
  }