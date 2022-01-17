function() {
        eLazy.event('reply setup completed');
        eLazy.namedValue('to', replyComposer.to);
        eLazy.namedValue('subject', replyComposer.subject);
        eLazy.namedValue('body', replyComposer.body);
      }