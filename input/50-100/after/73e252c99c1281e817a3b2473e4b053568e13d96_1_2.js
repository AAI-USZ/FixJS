function(sequence) {
        if (sequence.length !== $('.fdr').length) {
            this.rebuildFrame();
        } else {
            $('.fdr').each(function(idx, el) {
                $(el).slider('value', sequence[idx]);
                $(el).find('a').text(sequence[idx]); 
                this.updateBlinkerState(idx);
            }.bind(this));
        }
    }