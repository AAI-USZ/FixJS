function() {
              if ($table.data('graph-xaxis-type') == 'datetime') {
                return '<b>'+ this.series.name +'</b><br/>'+  Highcharts.dateFormat('%e. %b', this.x) +' : '+ this.y;
              } else {
                var xValue = typeof xValues[this.point.x] != 'undefined' ? xValues[this.point.x] : this.point.x;
                return '<strong>' + this.series.name + '</strong><br />' + xValue + ' : '  + this.point.name;
              }
            }