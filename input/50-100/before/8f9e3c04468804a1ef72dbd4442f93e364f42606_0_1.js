function() {
            if (this.options.fade) {
                this.tip().stop().fadeOut(function() { $(this).remove(); });
            } else if(this.$tip){
                this.tip().remove();
            }
        }