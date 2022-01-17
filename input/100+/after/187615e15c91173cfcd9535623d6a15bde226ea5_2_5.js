function (arg_n)
    {
        var a = new (x86.Assembler)(x86.target.x86);

        for (var i = 0; i < this.try_lvl; ++i)
        {
            a.mov(_mem(0, _EBP), _EBP);
        }

        if (arg_n > 0)
        {
            var SLOW = _label("SLOW");
            a.
            cmp(_$(arg_n), _mem(8, _EBP), 32).
            jl(SLOW).
            leave(). // not really faster but easier to read
            //mov(_EBP, _ESP).   
            //pop(_EBP).
            ret().
            label(SLOW).
            mov(_$(arg_n), _EDX).
            mov(this.gen_mref(photon.variadic_exit, "VAR_EXIT_SUBR"), _ECX).
            jmp(_ECX);
        }
        else
        {
            a.
            leave(). // not really faster but easier to read
            //mov(_EBP, _ESP).   
            //pop(_EBP).
            ret();
        }

        this.deferred_insert(a);

        return a.codeBlock.code;
    }