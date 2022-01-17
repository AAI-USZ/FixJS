function () {
  if(json.challengeId) {
      var aniSpeed = 2000;   
      if(json.processingComplete !== 'true') { 
        $('div#midas_challenge_competitor_listScoreStatus').html("Calculation status: not complete. It will be automatically updated shortly.");
        $('div#midas_challenge_competitor_listScoreStatus').animate( { color: 'red' }, aniSpeed);
        }
      else {
        $('div#midas_challenge_competitor_listScoreStatus').html("Calculation status: complete."); 
        $('div#midas_challenge_competitor_listScoreStatus').animate( { color: 'green' }, aniSpeed);
        }  
      }
   
        
}