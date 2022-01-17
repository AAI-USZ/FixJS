function() {
 
    function Matrix(){
        this.matrix = [ 
        [1,0,0,0],
        [0,1,0,0],
        [0,0,1,0],
        [0,0,0,1]
        ];
     
    }
    Matrix.prototype.multiply = function(b){
        var n = [4];
        for(var i = 0; i < 4; i++){
            n[i] = [4];
        }
        for(var i = 0; i < 3; i++) {
            n[i][0] = this.matrix[i][0] * b[0][0] + this.matrix[i][1] * b[1][0] + this.matrix[i][2] * b[2][0] + this.matrix[i][3] * b[3][0];
            n[i][1] = this.matrix[i][0] * b[0][1] + this.matrix[i][1] * b[1][1] + this.matrix[i][2] * b[2][1] + this.matrix[i][3] * b[3][1];
            n[i][2] = this.matrix[i][0] * b[0][2] + this.matrix[i][1] * b[1][2] + this.matrix[i][2] * b[2][2] + this.matrix[i][3] * b[3][2];
            n[i][3] = this.matrix[i][0] * b[0][3] + this.matrix[i][1] * b[1][3] + this.matrix[i][2] * b[2][3] + this.matrix[i][3] * b[3][3];
        }    
        this.matrix = n;
    }
    Matrix.prototype.translate = function(x,y,z){
        var trans =[
        [1, 0, 0, x],
        [0, 1, 0, y],
        [0, 0, 1, z],
        [0, 0, 0, 1]
        ];
        this.multiply(trans);
    }
    
    Matrix.prototype.scale = function (x,y,z){
        var trans =[
        [x, 0, 0, 0],
        [0, y, 0, 0],
        [0, 0, z, 0],
        [0, 0, 0, 1]
        ];       
        this.multiply(trans);
    }
    Matrix.prototype.rotateX = function(theta){
        var cos = Math.cos(theta);
        var sin = Math.sin(theta);
        var trans =[
        [1, 0, 0, 0],
        [0,  cos, -sin, 0],
        [0, sin, cos, 0],
        [0, 0, 0, 1]
        ];      
        this.multiply(trans);
    }
    Matrix.prototype.rotateY = function(theta){
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
    Matrix.prototype.applyTransform = function(v){
 
        var x = (v.x * this.matrix[0][0]) + (v.y * this.matrix[0][1]) + (v.z * this.matrix[0][2]) + (this.matrix[0][3]);
        var y = (v.x * this.matrix[1][0]) + (v.y * this.matrix[1][1]) + (v.z * this.matrix[1][2]) + (this.matrix[1][3]);
        var z = (v.x * this.matrix[2][0]) + (v.y * this.matrix[2][1]) + (v.z * this.matrix[2][2]) + (this.matrix[2][3]);

        return new POS3D.Vector(x, y, z);
    }
    
    Matrix.applyTransform = function(m,v){
        var x = (v.x * m.matrix[0][0]) + (v.y * m.matrix[0][1]) + (v.z * m.matrix[0][2]) + (m.matrix[0][3]);
        var y = (v.x * m.matrix[1][0]) + (v.y * m.matrix[1][1]) + (v.z * m.matrix[1][2]) + (m.matrix[1][3]);
        var z = (v.x * m.matrix[2][0]) + (v.y * m.matrix[2][1]) + (v.z *m.matrix[2][2]) + (m.matrix[2][3]);

        return new POS3D.Vector(x, y, z);   
    }
    /*
     *     
 


    public void rotateY(final double theta) {
        final double cos = StrictMath.cos(theta);
        final double sin = StrictMath.sin(theta);
        trans = new double[][] {
                {cos, 0, sin, 0},
                {0, 1, 0, 0},
                {-sin, 0, cos, 0},
                {0, 0, 0, 1}
        };
        multiply(trans);
    }

// --Commented out by Inspection START (6/16/08 1:17 AM):
//    public void rotateZ(final double theta) {
//        final double cos = StrictMath.cos(theta);
//        final double sin = StrictMath.sin(theta);
//        trans = new double[][] {
//                {cos, -sin, 0, 0},
//                {sin, cos, 0, 0},
//                {0, 0, 1, 0},
//                {0, 0, 0, 1}
//        };
//        multiply(trans);
//    }
// --Commented out by Inspection STOP (6/16/08 1:17 AM)


     */
    return Matrix;
}