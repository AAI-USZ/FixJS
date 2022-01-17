function Grace_allocObject() {
    return {
        methods: {
            "==": GraceObjectMethods["=="],
            "!=": GraceObjectMethods["!="],
            "/=": GraceObjectMethods["/="],
            "asString": GraceObjectMethods["asString"],
        },
        superobj: null,
        data: {},
        className: "Object",
        mutable: false,
    };
}