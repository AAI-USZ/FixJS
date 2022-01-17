function() {
            if (!this.$tip) {
                this.$tip = $('<div class="tipsy"></div>');
                if(this.options.arrow){
                    this.$tip.html('<div class="tipsy-arrow"></div><div class="tipsy-inner"/></div>');
                } else {
                    this.$tip.html('<div class="tipsy-inner"/></div>');
                }
            }
            return this.$tip;
        }