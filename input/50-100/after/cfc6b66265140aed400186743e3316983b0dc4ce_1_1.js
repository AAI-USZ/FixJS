function (){
                var ct = Date.now();
                var max = parseInt(this.maxCount);
                var diff = (ct - parseInt(this.startTime))/1000;

                var speed = "Not enough phases requested!";
                if(diff != 0){
                    speed = "" + Math.ceil(2*max / diff) + " phases per second!";
                }

                console.log("Benchmark results: " + speed + " Time spent: " + diff + "seconds ");
            }