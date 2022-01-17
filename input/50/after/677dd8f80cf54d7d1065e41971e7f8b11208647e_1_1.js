function(){
        var e = re.e(this.name), f = this._re_factory;

        if(f)
            f.apply(e, arguments);

        return e;
    }