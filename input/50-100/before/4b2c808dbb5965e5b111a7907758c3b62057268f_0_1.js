function() {
            for(i in this.v) {
                this.m[i] = ~~ (0.5 + ((this.s[i] * this.v[i] - this.o.min) / this.f[i]) + this.cur2) ;
            }
        }