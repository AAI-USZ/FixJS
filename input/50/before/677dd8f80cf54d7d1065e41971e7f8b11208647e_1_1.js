function(){
        var e = re.e(this.name);

        if(this._re_factory)
            this._re_factory.apply(e, arguments);

        return e;
    }