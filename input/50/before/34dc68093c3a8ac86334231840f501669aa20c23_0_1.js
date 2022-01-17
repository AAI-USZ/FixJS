function isLeftHandSide(expr) {
        switch (expr.type) {
        case Syntax.Identifier:
        case Syntax.MemberExpression:
        case Syntax.CallExpression:
            return true;
        }
        return false;
    }