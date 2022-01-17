function(){
        console.log('contentLength -> content != null -> '+ this.content != null);
        return this.content != null ? this.content.length : 0;
    }