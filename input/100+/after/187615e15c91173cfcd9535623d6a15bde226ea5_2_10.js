function (m, lst)
    {
        assert(m === null || ((typeof m) === "object" && m.__addr__ !== undefined), "Invalid reference");

        var label = _label(lst);
        this.ref_ctxt().push(label);

        /*
        if (m === null)
            return _$(0, label);
        if (typeof m.__addr_bytes__ !== "function")
        {
            var bytes = mirror_addr_bytes.call(m);
        } else
        {
            var bytes = m.__addr_bytes__();
        }
        return _$(addr_to_num(bytes), label);
        */

        label.__obj__ = (m === null) ? undefined : m;
        return _$(_UNDEFINED, label);
    }