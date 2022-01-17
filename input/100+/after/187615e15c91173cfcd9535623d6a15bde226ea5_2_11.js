function (nb, rcv, msg, args, bind_helper)
    {
        if (bind_helper === undefined)
        {
            bind_helper = photon.bind;
        }

        var loc = -(this.stack_location_nb + nb) * this.sizeof_ref + this.bias;
        var that = this;

        var msg_expr = this.gen_symbol(msg);

        return [
            this.stack_alloc(nb),
            rcv,
            _op("mov", _EAX, _mem(loc + this.sizeof_ref, _EBP), 32),
            args.map(function (a, i) 
            { 
                var offset = loc + (i + 3) * that.sizeof_ref;
                return [a, _op("mov", _EAX, _mem(offset, _EBP))]; 
            }),
            _op("mov", _$(args.length), _mem(loc, _EBP), 32),

            // Bind
            msg_expr,
            _op("push", _EAX),
            _op("push", _$(0)), // NULL CLOSURE
            _op("push", _$(0)), // NULL RECEIVER
            _op("push", _$(4)),  // Arg number
            _op("mov", this.gen_mref(bind_helper, "BIND"), _EAX),
            _op("call", _EAX),
            this.magic_cookie(),
            _op("add", _$(16), _ESP),
            _op("mov", _EAX, _mem(loc + 2 * this.sizeof_ref, _EBP)), // SET CLOSURE
            _op("call", _EAX),
            this.magic_cookie(),
            _op("add", _$(nb*this.sizeof_ref), _ESP)
        ];
    }