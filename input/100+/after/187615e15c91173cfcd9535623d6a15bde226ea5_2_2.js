function_object:function (code, ref_labels, cell_nb, print)
    {
        if (cell_nb === undefined)
        {
            cell_nb = 0;
        }

        //print("Code AST");
        //print(code.toString());
        code = flatten(code);
        //print("Flattened Code AST");
        //print(clean(code).toString());
        var codeBlock = _asm(code).codeBlock;

        codeBlock.align(this.sizeof_ref);
        codeBlock.genListing("// Filling bytes for alignment");
        //print("assemble");
        codeBlock.assemble();
        //print(codeBlock.code.toString());
        //print("listing");

        if (print !== undefined)
        {
            print(codeBlock.listingString());
        }


        ref_labels.sort(function (a, b)
        {
            return b.getPos() - a.getPos();
        });

        var refs = [];

        // Add positions of refs as tagged integers
        ref_labels.forEach(function (l)
        {
            codeBlock.gen32(_ref(l.offset_type !== "negated" ? l.getPos() : -l.getPos()));

            assert(l.__obj__  !== undefined, "Invalid label");
            assert(l.getPos() !== 0,         "Label '" + l.id + "' was not used");
            if (l.__obj__ !== null)
            {
                refs.push(l.getPos());
                refs.push(l.__obj__);
            }
        });

        // Add the number of refs as a tagged integer
        codeBlock.gen32(_ref(ref_labels.length));

        code = clean(codeBlock.code);
        var length = code.length;

        var f = photon.send(photon["function"], "__new__", length, cell_nb);
        photon.send(f, "__intern__", code, refs);

        return f;
    }