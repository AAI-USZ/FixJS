function( offset ){
            $( document ).scrollTop( this.$el.offset().top + offset );
            return this;
        }