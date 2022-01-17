function toMySQLTime(inTime) {
        var rePm = /PM$/g;
        var reAm = /AM$/g;
        
        var date = /(\d+-\d+-\d+)/g;
        //var time = / (\d+:\d+) /g;
        var hrs = /(\d+):/;
        //var mins = /\d+-\d+-\d+ \d+:(\d+) /g;
        var mins = /:(\d+)/;
        
        if(rePm.test(inTime)) {
            console.log("fixing a pm:" + inTime);
            var d = date.exec(inTime);
            console.log("d:" + d[0]);

            var hrsNew = hrs.exec(inTime) ;
            console.log("hrsNew:" + hrsNew[0]);
            
            var minsNew = mins.exec(inTime);
            console.log("minsNew:" + minsNew[0]);
            
            var newTime = d[0] + " " + (parseInt(hrsNew[1]) + 12) + ":" + minsNew[1];
            console.log("newtime:" + newTime);
            
            return newTime;
            }
        if(reAm.test(inTime)) {
            console.log("fixing a am");
            var d = date.exec(inTime);
            console.log("d:" + d[0]);

            var hrsNew = hrs.exec(inTime) ;
            console.log("hrsNew:" + hrsNew[0]);
            
            var minsNew = mins.exec(inTime);
            console.log("minsNew:" + minsNew[0]);
            
            var newTime = d[0] + " " + parseInt(hrsNew[0]) + ":" + minsNew[1];
            console.log("newtime:" + newTime);
            
            return newTime;
            }
        }