function(options){
        var i,len,defaults = this.defaults;

        if( _.keys(this.attributes).length !== _.keys(this.defaults).length ){
            return true;
        }

        for( i=0,len=defaults.length;i<len;i++ ){
            if( defaults[i] !== this.attributes[ i ] )
                return true;
        }

        return false;
    }