function(expression){
            if (expression instanceof $data.Expressions.EntitySetExpression){
                ret.push(ctx._entitySetReferences[expression.elementType.name]);
            }
            if (expression.source) fn(expression.source);
        }