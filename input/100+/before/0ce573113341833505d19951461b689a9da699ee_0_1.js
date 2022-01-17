function(bucketInfo) {
        var name = bucketInfo.name;

        var healthStats = bucketInfo.healthStats;

        var total = _.inject(healthStats, function (a,b) {return a+b}, 0);

        var minimalAngle = Math.PI/180*30;
        var nodeSize = Math.PI*2/total;

        var stolenSize = 0;
        var maxAngle = 0;
        var maxIndex = -1;

        for (var i = healthStats.length; i--;) {
          var newValue = healthStats[i] * nodeSize;
          if (newValue != 0 && newValue < minimalAngle) {
            stolenSize += minimalAngle - newValue;
            newValue = minimalAngle;
          }
          healthStats[i] = newValue;
          if (newValue >= maxAngle) {
            maxAngle = newValue;
            maxIndex = i;
          }
        }

        if (maxIndex < 0) {
          BUG();
        }

        healthStats[maxIndex] -= stolenSize;

        $($i(name+'_health')).sparkline(healthStats, {
          type: 'pie',
          sliceColors: ['#4A0', '#fac344', '#f00'],
          height: (isCanvasSupported ? '1.5em' : 'auto')
        }).mouseover(function(ev) {
          $(ev.target).attr('title',
              bucketInfo.healthStats[0] + ' healthy, ' +
              bucketInfo.healthStats[1] + ' unhealthy, ' +
              bucketInfo.healthStats[2] + ' down');
        });
      }