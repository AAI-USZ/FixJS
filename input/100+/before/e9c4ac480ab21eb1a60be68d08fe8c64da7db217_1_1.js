function Matrix(){
        this.matrix = [4];
        for(var i = 0; i < 4; i++){
            this.matrix[i] = [4];
        }
        this.matrix[0][0] = 1;
        this.matrix[1][1] = 1;
        this.matrix[2][2] = 1;
        this.matrix[3][3] = 1;
    }