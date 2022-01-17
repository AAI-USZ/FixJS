function (f, scope, offsets)
    {
        var cell_nb = 0;

        for (id in scope.captured())
        {
            cell_nb++;
        }
        
        var label  = _label("FUNCTION");
        label.__obj__ = f;
        ref_labels = [label];
            
        var c = this.new_function_object([
            _op("mov", _$(_UNDEFINED, label), _EAX),
            _op("jmp", _EAX)
        ], ref_labels, cell_nb);
        photon.send(c, "__set__", "length", photon.send(f, "__get__", "length"));

        return _op("mov", this.gen_mref(c, "CLOSURE"), _EAX); 
    }