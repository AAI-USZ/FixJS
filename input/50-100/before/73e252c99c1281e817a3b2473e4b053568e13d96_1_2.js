function(idx, el) {
            $(el).slider('value', sequence[idx]);
            $(el).find('a').text(sequence[idx]); 
            this.updateBlinkerState(idx);
        }