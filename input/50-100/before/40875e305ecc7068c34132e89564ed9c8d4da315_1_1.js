function(theta){
        var cos = Math.cos(theta);
        var sin = Math.sin(theta);
        var trans =[
        [ cos, 0, sin, 0],
        [  0, 1, 0, 0],
        [   -sin, 0, cos, 0],
        [  0, 0, 0, 1]
        ];      
        this.multiply(trans);
    }