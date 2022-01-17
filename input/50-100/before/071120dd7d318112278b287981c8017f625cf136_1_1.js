function() 
  { 
    
    $("table.scoreDisplay").dataTable(
      {
      "bPaginate": true,
      "bLengthChange": true,
      "bFilter": true,
      "bSort": true,
      "bInfo": true,
      "bAutoWidth": false,
      "aaSorting": [ [3,'desc'], [0,'asc'] ]
      }
    ); 
        
    $(".scoreContent").show();
    
    midas.challenge.competitor.showscoreSetup();

  }