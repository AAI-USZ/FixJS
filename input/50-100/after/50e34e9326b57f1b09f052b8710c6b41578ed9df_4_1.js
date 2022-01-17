function(any) {
        var s = typeof any;

        return s != "object" ? s
            : any == null ? "null"
            : any._type_
                || objectType[toString.call(any)]
                || nodeType[any.nodeType]
                || (any == any.window ? "Window" : "")
                || "object";
    }