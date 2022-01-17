function (query) {
            query.buildResultSet(that);
            if (query.expression.nodeType === $data.Expressions.ExpressionType.Single ||
                query.expression.nodeType === $data.Expressions.ExpressionType.Count ||
                query.expression.nodeType === $data.Expressions.ExpressionType.Some ||
                query.expression.nodeType === $data.Expressions.ExpressionType.Every) {
                if (query.result.length !== 1) {
                    callBack.error(new Exception('result count failed'));
                    return;
                }

                callBack.success(query.result[0]);
            } else if (query.expression.nodeType === $data.Expressions.ExpressionType.First) {
                if (query.result.length === 0) {
                    callBack.error(new Exception('result count failed'));
                    return;
                }

                callBack.success(query.result[0]);
            } else {
                callBack.success(query.result);
            }
        }