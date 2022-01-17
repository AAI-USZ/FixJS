function (nb, op, cste)
    {
        var a = new (x86.Assembler)(x86.target.x86);
        var END       = _label("END");
        var OVF       = _label("OVF");
        var TYPE_FAIL = _label("TYPE_FAIL");

        if (op === "+")
        {
            var handler = photon.handlers.add;
        } else if (op === "-")
        {
            var handler = photon.handlers.sub;
        }

        a.
        mov(_EAX, _ECX).
        and(_$(1), _ECX).
        je(TYPE_FAIL);

        if (op === "+")
        {
            a.add(_$(_ref(cste) - 1), _EAX);
        } else if (op === "-")
        {
            a.sub(_$(_ref(cste) - 1), _EAX);
        } else if (op === "&")
        {
            a.and(_$(_ref(cste)), _EAX);
        }

        a.
        jo(OVF).
        label(END);

        var a2 = new (x86.Assembler)(x86.target.x86);

        a2.
        label(TYPE_FAIL).
        mov(_EAX, _ECX);

        if (handler !== undefined)
        {
            a2.codeBlock.extend(this.gen_call(
                nb, 
                _op("mov", this.gen_mref(handler), _EAX),
                [_op("mov", _$(_ref(cste)), _EAX), _op("mov", _ECX, _EAX)]));
        }

        a2.
        jmp(END).
        label(OVF);

        a2.codeBlock.extend(this.gen_throw(this.gen_symbol("Cste arithmetic overflow")));

        a2.
        jmp(END);

        this.defer(a2.codeBlock.code);

        return a.codeBlock.code;
    }