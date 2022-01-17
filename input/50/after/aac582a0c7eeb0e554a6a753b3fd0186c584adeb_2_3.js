function(item){
            return {
                label: item.series.label,
                percent: Math.round(item.series.percent * 100)/100,
                rawnum: item.series.datapoints.points[1]
            };
        }