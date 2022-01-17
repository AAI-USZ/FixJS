function (nb)
    {
        var a = new (x86.Assembler)(x86.target.x86);
        var END       = _label("END");
        var OVF       = _label("OVF");
        var TYPE_FAIL = _label("TYPE_FAIL");
    
        a.
        mov(_EAX, _ECX).
        and(_mem(0, _ESP), _ECX).
        and(_$(1), _ECX).
        pop(_ECX).
        je(TYPE_FAIL).
        dec(_EAX).
        add(_ECX, _EAX).
        jo(OVF).
        label(END);

        var a2 = new (x86.Assembler)(x86.target.x86);

        a2.
        label(TYPE_FAIL);

        a2.codeBlock.extend(this.gen_call(
            nb, 
            _op("mov", this.gen_mref(photon.handlers.add, "ADD_HANDLER"), _EAX),
            [[], _op("mov", _ECX, _EAX)]));

        a2.
        jmp(END).
        label(OVF);

        a2.codeBlock.extend(this.gen_throw(this.gen_symbol("Addition overflow")));

        a2.
        jmp(END);

        this.defer(a2.codeBlock.code);

        return a.codeBlock.code;
    }