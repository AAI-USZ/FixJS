function(){

  /* private */

  var pieHover = function(event, pos, obj) {
    if (!obj) {
      return;
    }
    percent = parseFloat(obj.series.percent).toFixed(2);
    $("#hover").html('<span style="font-weight: bold; color: '+obj.series.color+'">'+obj.series.label+' ('+percent+'%)</span>');
  }
  
  var pieClick = function(event, pos, obj) {
    //console.log("click");
  }

  var init_pie_chart = function(data) {
      // DEFAULT
      $.plot($("#pie"), data, {
          series: {
            pie: { 
              show: true,
              label: {
                  show: true,
                  radius: 0.60,
                  formatter: function(label, series){
                      return '<div style="font-size:8pt;text-align:center;padding:2px;color:white;">'+label+'<br/>'+Math.round(series.percent)+'%</div>';
                  },
                  background: { opacity: 0.8 }
              },
            }
          },
          grid: {
            hoverable: true,
            clickable: true
          },
          legend: {
            show: false
          }
      });

      $("#pie").bind("plothover", pieHover);
      $("#pie").bind("plotclick", pieClick);

  }

  var load_general_fund_pie = function() {
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

  /* end private */

  return {

    init: function() {

      App.add_some_pie();

    },

    add_some_pie: function(){

      App.load_chart_data();

    },
  
    // Load and set the chart data to our ajax method
    load_chart_data: function(tag) {
    $.ajax({
      url: "/budget_line_items.json", 
        data: {
         tag: tag
        },
        success: function(data) {
          //chart_data = $.parseJSON(data);
          data = App.convert_to_pie_data(data, "department", "expenditure");
          console.log(data);

          init_pie_chart(data);
          //$.plot($("#pie"), data);
        },
        error: function(data) {
          console.log("Error loading chart data");
        }
    })
    },
    
    convert_to_pie_data: function(data, name, value) {
      var pie_data = [];
      for(var i=0;i<data.length; i++) {
        pie_data[i] = {label: data[i][name]["name"], data: data[i][value]};
      }
      return pie_data;
      // Added sample data and hooked it up to chart, convert data for pie chart
    }
  }

}