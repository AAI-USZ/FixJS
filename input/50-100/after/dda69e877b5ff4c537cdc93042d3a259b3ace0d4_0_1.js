function Grace_allocObject() {
    return {
        methods: {
            "==": GraceObjectMethods["=="],
            "!=": GraceObjectMethods["!="],
            "asDebugString": GraceObjectMethods["asString"],
            "asString": GraceObjectMethods["asString"],
        },
        superobj: null,
        data: {},
        className: "Object",
        mutable: false,
    };
}