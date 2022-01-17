function() {
    eLazy.expect_event('sent');

    composer.to.push({ name: 'Myself', address: TEST_PARAMS.emailAddress });
    composer.subject = uniqueSubject;
    composer.body = 'Antelope banana credenza.\n\nDialog excitement!';

    composer.finishCompositionSendMessage(function(err, badAddrs) {
      if (err)
        eLazy.error(err);
      else
        eLazy.event('sent');
    });
  }