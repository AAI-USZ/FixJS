function(series) { 
              series.key = series.key + (series.bar ? ' (left axis)' : ' (right axis)');
              return series;
            }