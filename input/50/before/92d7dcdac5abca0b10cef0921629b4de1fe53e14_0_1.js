function(XMLHttpRequest, textStatus, errorThrown){
      $('#validateResultsFolder_Fail').show();
      var validationInfo = '';
      validationInfo = '<br/> <b>Reason: </b>' + XMLHttpRequest.message + '<br/> </br>';
      $('div#midas_challenge_competitor_validatedResultsFolder_Info').html(validationInfo);
      }