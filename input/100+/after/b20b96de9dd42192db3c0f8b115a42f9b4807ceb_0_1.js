function(seq_id) {
        var _ = this._;
        var index, delta, x0, x1, xx;
        var i, imax;
        
        if (!_.ison) return timbre._.none;
        
        var cell = this.cell;
        if (seq_id !== this.seq_id) {
            this.seq_id = seq_id;
            
            var freq = _.freq.seq(seq_id);
            var mul  = _.mul , add = _.add;
            var wave = _.wave, x   = _.x, coeff = _.coeff;
            
            if (_.ar) { // ar-mode
                if (_.freq.isAr) {
                    for (i = 0, imax = cell.length; i < imax; ++i) {
                        index = x|0; delta = x - index;
                        x0 = wave[index & 1023]; x1 = wave[(index+1) & 1023];
                        cell[i] = ((1.0 - delta) * x0 + delta * x1) * mul + add;
                        x += freq[i] * coeff;
                    }
                } else {
                    var dx = freq[0] * coeff;
                    for (i = 0, imax = cell.length; i < imax; ++i) {
                        index = x|0; delta = x - index;
                        x0 = wave[index & 1023]; x1 = wave[(index+1) & 1023];
                        cell[i] = ((1.0 - delta) * x0 + delta * x1) * mul + add;
                        x += dx;
                    }
                }
            } else {    // kr-mode
                index = x|0; delta = x - index;
                x0 = wave[index & 1023]; x1 = wave[(index+1) & 1023];
                xx = ((1.0 - delta) * x0 + delta * x1) * mul + add;
                for (i = imax = cell.length; i--; ) cell[i] = xx;
                x += freq[0] * coeff * imax;
            }
            while (x > 1024) x -= 1024;
            _.x = x;
        }
        
        return cell;
    }