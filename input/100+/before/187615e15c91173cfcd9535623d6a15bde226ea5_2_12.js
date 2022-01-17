function (nb, fn, args)
    {
        var loc = -(this.stack_location_nb + nb) * this.sizeof_ref + this.bias;
        var that = this;

        return [
            this.stack_alloc(nb),
            args.map(function (a, i) 
            { 
                return [a, _op("mov", _EAX, _mem(loc + (i + 3) * that.sizeof_ref, _EBP))]; 
            }),
            _op("mov", _$(args.length), _mem(loc, _EBP), 32),
            _op("mov", this.gen_mref(photon.global), _mem(loc + this.sizeof_ref, _EBP), 32),
            fn, 
            _op("mov", _EAX, _mem(loc + 2 * this.sizeof_ref, _EBP)), 
            _op("call", _EAX), 
            this.magic_cookie(),
            _op("add", _$(nb*this.sizeof_ref), _ESP)
        ];
    }