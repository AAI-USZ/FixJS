function (nb, rcv, msg, args, bind_helper)
{
    if (bind_helper === undefined || bind_helper === photon.bind)
    {
        bind_helper = photon.inline_bind;
    }

    var CONT = _label();
    var BIND = _label();
    var loc = -(this.stack_location_nb + nb) * this.sizeof_ref + this.bias;
    var that = this;

    var MAP    = _label();
    MAP.offset_type = "negated";
    this.ref_ctxt().push(MAP);

    var msg_expr    = this.gen_symbol(msg);
    var clos_offset = loc + 2 * this.sizeof_ref;

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

        // Inline cache
        _op("mov", _mem(loc + this.sizeof_ref, _EBP), _ECX), // Retrieve rcv

        // Handle fixnum or constant cases
        _op("mov", _ECX,  _EDX),
        _op("and", _$(1), _EDX),
        _op("jne", BIND),
        _op("cmp", _$(10), _ECX),
        _op("jle", BIND),

        // Object case
        _op("mov", _mem(-5*this.sizeof_ref, _ECX), _ECX), // Retrieve rcv's extension
        _op("mov", _mem(-this.sizeof_ref, _ECX), _EDX),   // Retrieve rcv's map
        0x81, 0xfa, MAP, 0x00, 0x00, 0x00, 0x00, _listing("cmp $MAP, %edx"),          // Check against last map (cmp $(MAP), edx)
        _op("jne", BIND),                                 // Perform method binding in case of cache miss
        0x00, 0x00, 0x00, 0x00, 0x00, 0x00, _listing("mov $METHOD, %eax"),               // Retrieve cached method 
                                                          //    (or method from cached location) 

        _op("jmp", CONT),
        0,0,0,0, _listing("(data) NEXT"),     // next     node in list
        0,0,0,0, _listing("(data) PREVIOUS"), // previous node in list
        this.cache_position(-8),

        BIND, _lbl_listing(BIND),
        // Bind
        msg_expr,
        _op("push", _EAX),
        _op("push", _$(0)), // NULL CLOSURE
        _op("push", _$(0)), // NULL RECEIVER
        _op("push", _$(4)),  // Arg number
        _op("mov", this.gen_mref(bind_helper), _EAX),
        _op("call", _EAX),
        this.magic_cookie(),
        _op("add", _$(16), _ESP),

        CONT, _lbl_listing(CONT),
        //_op("mov", _EAX, _mem(loc + 2 * this.sizeof_ref, _EBP)) 
        0x89, 0x85, _op("gen32", clos_offset), _listing("mov %eax, " + clos_offset + "(%ebp)"), // SET CLOSURE (Fixed encoding)
        _op("call", _EAX),
        this.magic_cookie(),
        _op("add", _$(nb*this.sizeof_ref), _ESP)
    ];
}