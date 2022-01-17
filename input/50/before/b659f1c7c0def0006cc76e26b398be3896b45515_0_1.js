function parseProgram() {
        var program;
        strict = false;
        program = {
            type: Syntax.Program,
            body: parseProgramElements()
        };
        return program;
    }