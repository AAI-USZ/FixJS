function(tra0, tra1, tra2, tra3, trb0, trb1, trb2, trb3, trc0, trc1, trc2, trc3, trd0, trd1, trd2, trd3, trd4){
        var ta0 = this.a0 * tra0 + this.a1 * trb0 + this.a2 * trc0 + this.a3 * trd0;
        var ta1 = this.a0 * tra1 + this.a1 * trb1 + this.a2 * trc1 + this.a3 * trd1;
        var ta2 = this.a0 * tra2 + this.a1 * trb2 + this.a2 * trc2 + this.a3 * trd2;
        var ta3 = this.a0 * tra3 + this.a1 * trb3 + this.a2 * trc3 + this.a3 * trd3;
        var tb0 = this.b0 * tra0 + this.b1 * trb0 + this.b2 * trc0 + this.b3 * trd0;
        var tb1 = this.b0 * tra1 + this.b1 * trb1 + this.b2 * trc1 + this.b3 * trd1;
        var tb2 = this.b0 * tra2 + this.b1 * trb2 + this.b2 * trc2 + this.b3 * trd2;
        var tb3 = this.b0 * tra3 + this.b1 * trb3 + this.b2 * trc3 + this.b3 * trd3;
        var tc0 = this.c0 * tra0 + this.c1 * trb0 + this.c2 * trc0 + this.c3 * trd0;
        var tc1 = this.c0 * tra1 + this.c1 * trb1 + this.c2 * trc1 + this.c3 * trd1;
        var tc2 = this.c0 * tra2 + this.c1 * trb2 + this.c2 * trc2 + this.c3 * trd2;
        var tc3 = this.c0 * tra3 + this.c1 * trb3 + this.c2 * trc3 + this.c3 * trd3;
        var td0 = this.d0 * tra0 + this.d1 * trb0 + this.d2 * trc0 + this.d3 * trd0;
        var td1 = this.d0 * tra1 + this.d1 * trb1 + this.d2 * trc1 + this.d3 * trd1;
        var td2 = this.d0 * tra2 + this.d1 * trb2 + this.d2 * trc2 + this.d3 * trd2;
        var td3 = this.d0 * tra3 + this.d1 * trb3 + this.d2 * trc3 + this.d3 * trd3;
        //     for(var i = 0; i < 3; i++) {
        //  n[i][0] = this.matrix[i][0] * b[0][0] + this.matrix[i][1] * b[1][0] + this.matrix[i][2] * b[2][0] + this.matrix[i][3] * b[3][0];
        // n[i][1] = this.matrix[i][0] * b[0][1] + this.matrix[i][1] * b[1][1] + this.matrix[i][2] * b[2][1] + this.matrix[i][3] * b[3][1];
        //  n[i][2] = this.matrix[i][0] * b[0][2] + this.matrix[i][1] * b[1][2] + this.matrix[i][2] * b[2][2] + this.matrix[i][3] * b[3][2];
        //   n[i][3] = this.matrix[i][0] * b[0][3] + this.matrix[i][1] * b[1][3] + this.matrix[i][2] * b[2][3] + this.matrix[i][3] * b[3][3];
                
        //   }    
        this.a0 = ta0;
        this.a1 = ta1;
        this.a2 = ta2;
        this.a3 = ta3;
        this.b0 = tb0;
        this.b1 = tb1;
        this.b2 = tb2;
        this.b3 = tb3;
        this.c0 = tc0;
        this.c1 = tc1;
        this.c2 = tc2;
        this.c3 = tc3;
        this.d0 = td0;
        this.d1 = td1;
        this.d2 = td2;
        this.d3 = td3;
    }