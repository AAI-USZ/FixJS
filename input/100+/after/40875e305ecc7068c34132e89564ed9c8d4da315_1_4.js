function(theta){
        var cos = Math.cos(theta);
        var sin = Math.sin(theta);
        /*  var trans =[
        [1, 0, 0, 0],
        [0,  cos, -sin, 0],
        [0, sin, cos, 0],
        [0, 0, 0, 1]
        ];   
        */
        this.multiply(1,0,0,0,0,cos,-sin,0,0,sin,cos,0,0,0,0,1);
    }