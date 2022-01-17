function() {
          console.log($('#EditForm').data('eventStack').status);
          $('#EditForm').eventStack('pause');
          console.log($('#EditForm').data('eventStack').status);
          $('#EditForm').eventStack('resume');
          console.log($('#EditForm').data('eventStack').status);
          eventStack.eventStack('complete', event);
        }