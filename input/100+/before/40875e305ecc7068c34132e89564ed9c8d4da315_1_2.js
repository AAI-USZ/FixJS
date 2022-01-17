function(b){
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