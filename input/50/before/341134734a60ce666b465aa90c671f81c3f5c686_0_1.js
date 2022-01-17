function isLeftHandSide(expr) {
        switch (expr.type) {
        case 'AssignmentExpression':
        case 'BinaryExpression':
        case 'ConditionalExpression':
        case 'LogicalExpression':
        case 'SequenceExpression':
        case 'UnaryExpression':
        case 'UpdateExpression':
            return false;
        }
        return true;
    }