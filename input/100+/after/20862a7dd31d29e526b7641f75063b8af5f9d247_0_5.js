function(results) {
      var validationInfo = '';
      var matchedItemsInfo = '';
      if( $.isArray(results.data.truthWithoutResults) ) //  it is either an empty array (initialarray), or an object collection
        {
        //midas.createNotice("The selected results folder is valid!", 4000);  
        $('#validateResultsFolder_AllMatched').show();   
        $('#validateResultsFolder_SomeMatched').hide();
        $('#validateResultsFolder_NoneMatched').hide();
        midas.challenge.competitor.enableScoring();
        }
      else 
        {
        if($.isArray(results.data.matchedTruthResults)) {
            $('#validateResultsFolder_NoneMatched').show();
            $('#validateResultsFolder_AllMatched').hide();   
            $('#validateResultsFolder_SomeMatched').hide();
            midas.challenge.competitor.disableScoring();
        }
        else {
            $('#validateResultsFolder_SomeMatched').show();
            $('#validateResultsFolder_NoneMatched').hide();
            $('#validateResultsFolder_AllMatched').hide();   
            midas.challenge.competitor.enableScoring();
        }
        validationInfo = '<br/> <b>Mismatched items: </b> <br/> </br>';
        validationInfo += '<table id="validationInfo" class="validation">';
        validationInfo += '<tr> <th>What is required by the challenge</th> <th>What is in your results folder</th></tr>';
        for (var idx in results.data.truthWithoutResults)
          {
          validationInfo += '<tr> <td> <span>' + results.data.truthWithoutResults[idx]+ '</span> </td>';
          validationInfo += '<td><img src="' + json.global.webroot + '/core/public/images/icons/nok.png"> </td> </tr>'; 
          }
        for (var idx in results.data.resultsWithoutTruth)
          {
          validationInfo += '<tr> <td><img src="' + json.global.webroot + '/core/public/images/icons/nok.png"> </td>';
          validationInfo += '<td> <span>' + results.data.resultsWithoutTruth[idx] + '</span> </td> </tr>';
          }
        validationInfo += '</table>';
        }
      $('div#midas_challenge_competitor_validatedResultsFolder_Info').html(validationInfo);
      
      if( !$.isArray(results.data.matchedTruthResults) ) // it is either an empty array (initialarray), or an object collectionn
        {
        matchedItemsInfo = '<br/> <b>Matched items: </b> <br/> </br>';
        matchedItemsInfo += '<table id="matchedItemsInfo" class="validation">';
        matchedItemsInfo += '<tr> <th>What is required by the challenge</th> <th>If it is in your results folder</th></tr>';
        for (var idx in results.data.matchedTruthResults)
          {
          matchedItemsInfo += '<tr> <td> <span>' + results.data.matchedTruthResults[idx]+ '</span> </td>';
          matchedItemsInfo += '<td><img src="' + json.global.webroot + '/core/public/images/icons/ok.png"> </td> </tr>'; 
          }
        matchedItemsInfo += '</table>';
        }
        $('div#midas_challenge_competitor_matchedItems_Info').html(matchedItemsInfo);
      }