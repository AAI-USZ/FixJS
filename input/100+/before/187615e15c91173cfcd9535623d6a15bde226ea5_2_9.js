function (nb, op, x, y, true_branch, else_branch)
    {
        if (op === "<")
        {
            var typeCheckNeeded = true;
            var handler = photon.handlers.lt;
            var jmpOp = "jge";
        } else if (op === "<=")
        {
            var typeCheckNeeded = true;
            var handler = photon.handlers.le;
            var jmpOp = "jg";
        } else if (op === ">")
        {
            var typeCheckNeeded = true;
            var handler = photon.handlers.gt;
            var jmpOp = "jle";
        } else if (op === ">=")
        {
            var typeCheckNeeded = true;
            var handler = photon.handlers.ge;
            var jmpOp = "jl";
        } else if (op === "===")
        {
            var typeCheckNeeded = false;
            var handler = null;
            var jmpOp = "jne";
        } else if (op === "!==")
        {
            var typeCheckNeeded = false;
            var handler = null;
            var jmpOp = "je";
        } else 
        {
            error("Invalid op");
        }

        var TRUE      = _label("TRUE");
        var FALSE     = _label("FALSE");
        var END       = _label("END");
        var TYPE_FAIL = _label("TYPE_FAIL");

        var a = new (x86.Assembler)(x86.target.x86);

        a.codeBlock.extend(x);
        a.push(_EAX);
        a.codeBlock.extend(y);
        a.pop(_ECX);

        if (typeCheckNeeded)
        {
            var TYPE_FAIL = _label("TYPE_FAIL");

            a.
            mov(_EAX, _EDX).
            and(_ECX, _EDX).
            and(_$(1), _EDX).
            je(TYPE_FAIL);
        }

        a.
        cmp(_EAX, _ECX)
        [jmpOp](FALSE);

        a.label(TRUE);
        a.codeBlock.extend(true_branch);
        a.jmp(END);

        a.label(FALSE);
        a.codeBlock.extend(else_branch);
        a.label(END);


        if (typeCheckNeeded)
        {
            var a2 = new (x86.Assembler)(x86.target.x86);

            a2.
            label(TYPE_FAIL);

            if (handler !== null)
            {
                a2.codeBlock.extend(this.gen_call(
                    nb, 
                    _op("mov", this.gen_mref(handler), _EAX),
                    [[], _op("mov", _ECX, _EAX)]));
            }

            a2.
            cmp(_$(_TRUE), _EAX). 
            jne(FALSE).
            jmp(TRUE);

            this.defer(a2.codeBlock.code);
        }

        return a.codeBlock.code;

    }