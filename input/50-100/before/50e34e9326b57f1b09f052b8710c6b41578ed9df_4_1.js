function(object) {
        var s = typeof object;

        return s != "object" ? s
            : object == null ? "null"
            : object._type_
                || objectType[toString.call(object)]
                || nodeType[object.nodeType]
                || (object == object.window ? "Window" : "")
                || "object";
    }