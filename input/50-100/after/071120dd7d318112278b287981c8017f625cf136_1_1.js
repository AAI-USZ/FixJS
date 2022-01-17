function() 
  { 
    

    //midas.challenge.competitor.showscoreSetup();
    
    
    
    $('#scorelistingtable').tablesorter({
        sortList: [[2,0]] 
    });
    
    
    // Set up sortable table
    $('#tablesorter_scores').tablesorter({
        sortList: [[0,0]] 
    });


  }