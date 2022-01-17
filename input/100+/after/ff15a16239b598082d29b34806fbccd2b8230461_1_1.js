function (value, amnt) {
        var amount, i, index;
        index = 0;

        amount = typeof amnt !== 'undefined' ? amnt : 1;

        if (value  <  this.min || value  >=  this.max) {
            return -999;
        }

        for (i = 0; i < this.bins.length; i++) {
            if (this.bins[i].lo  <=  value) {
                index = i;
            }
        }

        this.bins[index].weight  += amount;

        return 0;
    }