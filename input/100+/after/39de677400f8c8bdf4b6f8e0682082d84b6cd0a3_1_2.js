function () {
    var levels = this._levels,
        i = levels.length,
        program = new Program(), // TODO the final format of the output
        vars = new VariableDeclaration(),
        seen = {},
        index, indexVars, l,
        current, e;


// TODO handle shadowed identifiers
// TODO handle requires in nested scopes
// TODO handle redundant var declarations
// TODO handle module.exports that don't need to capture anything in scope, 
//      e.g. the entire file consists of the thing that becomes module.exports
// TODO handle requires that is either part of an ObjectExpression, e.g. the
//      required thing is going to be a property of an object literal, or is
//      on the right side of an AssignmentExpression, either to an existing 
//      Identifier or to a MemberExpression
    program.append(vars);

    while (--i) {
        for (var j = 0, k = levels[i].length; j < k; j++) {
            current = levels[i][j];
            if (!seen[current.name]) {
//                console.log('JUST SAW:', current.name);
                vars.append(moduleDeclaration(current.name));
                try {
                    program.append(moduleBody(current.name, current.ast.body));
                } catch (e) {
                    console.log(e.message);
                    console.log(e.stack);
                    process.exit(1);
                }
                seen[current.name] = true;
            }
            // down to one per module, yay
            removeRequire(current.ast, seen, current.name);
            program.append(moduleClose(current.name));
        }
    }
    return {
        ast: program,
        src: escodegen.generate(program/*, { // TODO figure out how to keep
            comment: true,                 // comments from each module
            format: {
                indent: {
                    adjustMultilineComment: true
                }
            }
        }*/)
    };

}