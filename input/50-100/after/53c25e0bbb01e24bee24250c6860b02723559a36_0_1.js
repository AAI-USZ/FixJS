function(series, x, y) {
          var dateStr = window.moment.utc(new Date(x*1000)).local().format("YYYY-MM-DD HH:mm");
          var date = '<span class="date">' + dateStr + '</span>';
          var swatch = '<span class="detail_swatch" style="background-color: ' + series.color + '"></span>';
          var content = swatch + series.name + ": " + parseInt(y) + '<br>' + date;
          return content;
        }