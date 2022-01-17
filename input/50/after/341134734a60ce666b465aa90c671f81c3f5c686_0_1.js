function isLeftHandSide(expr) {
        switch (expr.type) {
        case Syntax.Identifier:
        case Syntax.MemberExpression:
        case Syntax.CallExpression:
        case Syntax.NewExpression:
            return true;
        }
        return false;
    }