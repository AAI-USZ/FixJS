function() {
          console.log($('#EditForm').data('eventStack').status);
          $('#EditForm').eventStack('pause');
          console.log($('#EditForm').data('eventStack').status);
          $('#EditForm').eventStack('resume');
          eventStack.eventStack('complete', event);
          console.log($('#EditForm').data('eventStack').status);
        }