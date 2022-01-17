function() {
                    var d = new Date(this.x);
                    d = d.toUTCString().split(" ");
                    d = d[4] + " " + d[5] + getTimeZone();
                    return '<b>'+ this.series.name +'</b><br/><em>Time: </em>'+ d +'<br/><em>Usage: </em>'+ this.y + 'MB';
                }