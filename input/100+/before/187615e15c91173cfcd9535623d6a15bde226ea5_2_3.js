function (f, scope, offsets)
    {
        var cell_nb = 0;

        for (id in scope.captured())
        {
            cell_nb++;
        }
        
        var label  = _label();
        ref_labels = [label];
            
        var c = this.new_function_object([
            _op("mov", _$(addr_to_num(f.__addr_bytes__()), label), _EAX),
            _op("jmp", _EAX)
        ], ref_labels, cell_nb);
        photon.send(c, "__set__", "length", photon.send(f, "__get__", "length"));

        return _op("mov", this.gen_mref(c), _EAX); 
    }