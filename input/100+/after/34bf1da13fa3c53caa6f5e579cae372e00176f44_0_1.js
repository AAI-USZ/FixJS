function(data) {
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