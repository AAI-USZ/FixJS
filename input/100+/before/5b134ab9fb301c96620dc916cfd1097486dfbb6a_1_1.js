function(axis){
            var ctx = axis.canvas.getContext("2d");
            ctx.clearRect(0,0,axis.canvas.width,axis.canvas.height);//clear drawing area

            ctx.fillStyle="black";

            var min = axis.getMin();
            var max = axis.getMax();


            for (var i = 0; i < 10; i++){//draw 10 numbers;
                var value = i * 2000;
                var y = axis.canvas.height - axis.canvas.height * i / 10;
                ctx.fillText(Math.round(value),0,y);
            }
        }