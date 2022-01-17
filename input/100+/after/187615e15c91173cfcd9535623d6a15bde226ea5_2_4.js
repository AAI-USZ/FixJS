function (local_n, arg_n)
    {
        var a = new (x86.Assembler)(x86.target.x86);
       
        if (arg_n > 0)
        {
            var FAST = _label("FAST_ENTRY");

            // Check arg number
            a.
            push(_EBP).
            cmp(_$(arg_n), _mem(8, _ESP), 32).
            jge(FAST).
            mov(this.gen_mref(photon.variadic_enter, "VAR_ENTER_SUBR"), _EAX).
            push(_$(arg_n)).
            call(_EAX);
            a.codeBlock.extend(this.magic_cookie());
            a.
            add(_$(4), _ESP).
            // Fast entry point
            label(FAST).
            mov(_ESP, _EBP);
        }
        else
        {
            // Setup stack frame 
            a.
            enter(_$(0),_$(0)); // not really faster but easier to read
            //push(_EBP).
            //mov(_ESP, _EBP);
        }

        // Reserve space for locals
        for (var i=0; i<local_n; i++)
            a.push(_$(_UNDEFINED));

        return a.codeBlock.code;
    }