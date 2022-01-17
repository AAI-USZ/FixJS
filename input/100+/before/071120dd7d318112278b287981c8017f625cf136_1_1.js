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
   
    $("div.scoreHeading").qtip({
          content: 'Click to show or hide scores for this challenge!',
          show: 'mouseover',
          hide: 'mouseout',
          position: {
                target: 'mouse',
                my: 'bottom left',
                viewport: $(window), // Keep the qtip on-screen at all times
                effect: true // Disable positioning animation
             }
         }).click(function(){
             $(this).next(".scoreContent").slideToggle(100);
            }) 
            
    .toggle(
      function() 
        {
        $(this).children("span").text("+");
        }, 
      function()
        {
        $(this).children("span").text("-");
        }
     );           
}