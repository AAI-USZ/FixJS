function (n, name, nb, end)
    {
        if (n === undefined)
        {
            n = 2;
        }

        if (name === undefined)
        {
            name = "";
        }

        var a = new (x86.Assembler)(x86.target.x86);
        var FAST = _label("FAST");

        a.
        genListing("TYPE TEST:").
        mov(_EAX, _ECX).
        and(_$(1), _ECX);

        if (n === 2)
        {
            a.
            and(_mem(0, _ESP), _ECX);
        }

        a.
        jne(FAST);

        if (photon.handlers[name] !== undefined)
        {
            a.
            pop(_ECX).
            codeBlock.extend(this.gen_call(
                nb, 
                _op("mov", this.gen_mref(photon.handlers[name], name), _EAX),
                [[], _op("mov", _ECX, _EAX)]));
            a.
            jmp(end);
        } else
        {
            a.codeBlock.extend(this.gen_throw(this.gen_symbol("Fixnum test failed for '" + name + "', no handler defined")));
        }

        a.
        label(FAST);

        return a.codeBlock.code;
    }