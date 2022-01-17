function(){
            return this.hoverState === 'in' || // almost visible
                   (this.hoverState !== 'out' &&  
                   !!(this.$tip && this.$tip[0].parentNode));
        }