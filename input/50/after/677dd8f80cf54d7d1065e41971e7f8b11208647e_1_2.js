function(f){
        this._re_method = f.bind(re[this.name]);
        return this;
    }