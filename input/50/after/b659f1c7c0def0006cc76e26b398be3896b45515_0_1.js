function parseProgram() {
        var program;
        strict = false;
        yieldAllowed = false;
        program = {
            type: Syntax.Program,
            body: parseProgramElements()
        };
        return program;
    }