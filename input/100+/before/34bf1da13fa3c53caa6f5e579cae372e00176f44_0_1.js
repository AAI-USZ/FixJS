function() {

    var data = [];
    var series = Math.floor(Math.random()*10)+1;
    for( var i = 0; i<series; i++)
    {
      data[i] = { label: "Series"+(i+1), data: Math.floor(Math.random() * 100)+1 }
    }
    
    // DEFAULT
    $.plot($("#pie"), data, {
        series: {
          pie: { 
            show: true
          }
        },
        grid: {
          hoverable: true,
          clickable: true
        }
    });
    /*
        $.ajax({url: "/budget_line_items.json",
          data: {
           tag: tag
          },
          success: function(data) {
            chart_data = $.parseJSON(data);
            $.plot($("#pie"), chart_data);
          },
          error: function(data) {
            console.log("Error loading chart data");
          }
        })
    */
  }