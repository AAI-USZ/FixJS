function (otherHisto, sc1, sc2) {
        var j, scale1, scale2, sumHisto;

        if (this.nBins !==  otherHisto.nBins || this.min !==  otherHisto.min || this.max !==  otherHisto.max) {
            alert('Can\'t add histrograms with different binning.    Aborting...');
            return -999;
        }

        sumHisto = new Histo('sumHisto', this.nBins, this.min, this.max);

        scale1 = typeof sc1 !== 'undefined' ? sc1 : 1;
        scale2 = typeof sc2 !== 'undefined' ? sc2 : 1;

        for (j = 0; j < this.bins.length; j++) {
            sumHisto.increment(this.bins[j].lo, scale1 * this.bins[j].weight);
            sumHisto.increment(otherHisto.bins[j].lo, scale2 * otherHisto.bins[j].weight);
        }

        return sumHisto;
    }