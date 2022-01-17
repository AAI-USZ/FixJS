function (s)
    {
        if (typeof s !== "string")
        {
            throw error("Invalid string value '" + s + "'", {compiler:this.compiler});
        }
        return _op("mov", this.gen_mref(photon.send(photon.symbol, "__intern__", s)), _EAX);
    }