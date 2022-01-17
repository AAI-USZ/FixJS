function(){
      console.log('C done');
      $('#EditForm').eventStack('pause');
      console.log($('#EditForm').data('eventStack').status);
      $('#EditForm').eventStack('resume');
      console.log($('#EditForm').data('eventStack').status);
    }