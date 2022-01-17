function(expression){
            if (expression instanceof $data.Expressions.EntitySetExpression){
                if (ret.indexOf(ctx._entitySetReferences[expression.elementType.name]) < 0)
                    ret.push(ctx._entitySetReferences[expression.elementType.name]);
            }
            if (expression.source) fn(expression.source);
        }