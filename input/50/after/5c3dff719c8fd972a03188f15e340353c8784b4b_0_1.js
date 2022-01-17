function(series) { 
              series.originalKey = series.originalKey === undefined ? series.key : series.originalKey;
              series.key = series.originalKey + (series.bar ? ' (left axis)' : ' (right axis)');
              return series;
            }