function (m)
    {
        var label = _label();
        this.ref_ctxt().push(label);

        assert(m === null || ((typeof m) === "object" && m.__addr__ !== undefined), "Invalid reference");

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
    }