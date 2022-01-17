function() {
                    return '<b>'+ this.point.name +' GMT' + getTimeZone() +'</b>: '+ this.percentage.toFixed(2) +' %'+ ' ('+ this.point.y.toFixed(2) +' MB)';
                }