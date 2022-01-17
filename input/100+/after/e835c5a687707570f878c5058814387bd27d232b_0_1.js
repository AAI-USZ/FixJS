function (expr, env) {
    // Length 1 array
    if (typeof expr === 'object' &&
        expr.length === 1) {
        return evalScheem(expr[0], env);
    }

    // Numbers evaluate to themselves
    if (typeof expr === 'number') {
        return expr;
    }

    // Strings are variable references
    if (typeof expr === 'string') {
        return lookup(env, expr);
    }

    // Look at head of list for operation
    switch (expr[0]) {

    case '+':
        if (expr.length != 3) {
            throw new Error(
                "Operator '+' expected 2 operands, " + (expr.length-1) + " were given." );
        } else {
            return evalScheem(expr[1], env) +
                evalScheem(expr[2], env);
        }
        break;

    case '-':
        if (expr.length != 3) {
            throw new Error(
                "Operator '-' expected 2 operands, " + (expr.length-1) + " were given." );
        } else {
            return evalScheem(expr[1], env) -
                evalScheem(expr[2], env);
        }
        break;

    case '*':
        if (expr.length != 3) {
            throw new Error(
                "Operator '*' expected 2 operands, " + (expr.length-1) + " were given." );
        } else {
            return evalScheem(expr[1], env) *
                evalScheem(expr[2], env);
        }
        break;

    case '/':
        if (expr.length != 3) {
            throw new Error(
                "Operator '/' expected 2 operands, " + (expr.length-1) + " were given." );
        } else {
            return evalScheem(expr[1], env) /
                evalScheem(expr[2], env);
        }
        break;

    case 'quote':
        if (expr.length != 2) {
            throw new Error(
                "quote expected 1 expression, " + (expr.length-1) + " were given." );
        } else {
            return expr[1];
        }
        break;

    case 'define':              // create a new variable
        if (expr.length != 3) {
            throw new Error(
                "define expected 2 parameters, " + (expr.length-1) + " were given." );
        } else {
            add_binding(env, expr[1], evalScheem(expr[2], env));
            return 0;
        }
        break;

    case 'set!':                // update a variabl
        if (expr.length != 3) {
            throw new Error(
                "set! expected 2 parameters, " + (expr.length-1) + " were given." );
        } else {
            update(env, expr[1], evalScheem(expr[2], env));
            return 0;
        }
        break;

    case 'begin':
        if (expr.length < 2) {
            throw new Error(
                "begin expected at least 1 expression, 0 was given." );
        } else {
            var i = 0;
            var exprstack = expr.slice(1);
            for (i = 0; i < exprstack.length - 1; i++) {
                evalScheem(exprstack[i], env);
            }
            return evalScheem(exprstack[i], env);
        }
        break;

    case '=':
        if (expr.length != 3) {
            throw new Error(
                "'=' expected 2 expressions, " + (expr.length-1) + " were given." );
        } else {
            var eq = (
                evalScheem(expr[1], env) ===
                    evalScheem(expr[2], env)
            );

            if (eq) return '#t';
            else return '#f';
        }
        break;

    case '<':
        if (expr.length != 3) {
            throw new Error(
                "'<' expected 2 expressions, " + (expr.length-1) + " were given." );
        } else {

            var lt = (
                evalScheem(expr[1], env) <
                    evalScheem(expr[2], env)
            );

            if (lt) return '#t';
            else return '#f';
        }
        break;

    case '>':
        if (expr.length != 3) {
            throw new Error(
                "'>' expected 2 expressions, " + (expr.length-1) + " were given." );
        } else {
            var gt = (
                evalScheem(expr[1], env) >
                    evalScheem(expr[2], env)
            );
            if (gt) return '#t';
            else return '#f';
        }
        break;

    case 'cons':
        if (expr.length != 3) {
            throw new Error(
                "'cons' expected 2 lists, " + (expr.length-1) + " were given." );
        } else {
            var second = evalScheem(expr[2], env);
            var first = evalScheem(expr[1], env);
            second.unshift(first);
            return second;
        }
        break;

    case  'car':
        if (expr.length != 2) {
            throw new Error(
                "'car' expected only 1 list, " + (expr.length-1) + " were given." );
        } else {
            var res = evalScheem(expr[1], env);
            if (res.length === 0) { // empty res
                throw new Error(
                    "'car' expected a list with at least 1 element, a length " /
                        + res.length + " list was given." );
            } else {
                return res[0];
            }
        }
        break;

    case 'cdr':
        if (expr.length != 2) {
            throw new Error(
                "'cdr' expected 1 list, " + (expr.length-1) + " were given." );
        } else {
            var res = evalScheem(expr[1], env);
            if (res.length === 0) {
                throw new Error(
                    "'cdr' expected a list with at least 1 element, a length " /
                        + res.length + " list was given." );
            } else {
                return evalScheem(expr[1], env).slice(1);
            }
        }
        break;


    case 'if':
        if (expr.length != 4) {
            throw new Error(
                "'if' expected 3 parameters, " + (expr.length-1) + " were given." );
        } else {
            var res = evalScheem(expr[1], env);
            if (res === '#t') {
                return evalScheem(expr[2], env);
            } else if (res === '#f') {
                return evalScheem(expr[3], env);
            } else {
                throw new Error(
                    "'if' expected the first parameter to be #t or #f, " /
                        + res + " was given." );
            }
        }
        break;


    case 'lambda-one':
        return function(arg) {
            var bnd = {};
            bnd[expr[1]] = arg;
            var new_env = {
                bindings: bnd,
                outer: env
            };
            return evalScheem(expr[2], new_env);
        };

    case 'lambda':
        return function() {
            var bnd = {};
            for (var i = 0; i < expr[1].length; i++) {
                bnd[expr[1][i]] = arguments[i];
            }
            var new_env = {
                bindings: bnd,
                outer: env
            };
            return evalScheem(expr[2], new_env);
        };

    default:                    // function call
        var func = evalScheem(expr[0], env);
        var args = [];
        for (var i = 1; i < expr.length; i++) {
            args.push(evalScheem(expr[i], env));
        }
        return func.apply(null, args);
    }
}