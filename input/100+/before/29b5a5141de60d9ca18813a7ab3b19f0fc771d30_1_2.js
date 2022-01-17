function (expression, context) {
        if (expression.nodeType == $data.Expressions.ExpressionType.Or) context.or = true;
        else if (expression.nodeType == $data.Expressions.ExpressionType.And) context.and = true;
        
        this.Visit(expression.left, context);
        this.Visit(expression.right, context);
        
        if (expression.nodeType == $data.Expressions.ExpressionType.Or && context.stackOr && context.stackOr.length){
            var or = [];
            while (context.stackOr.length){
                var field = context.stackOr.pop();
                var expr = {};
                
                expr[field.field] = field.query;
                or.push(expr);
                delete context.query[field.field];
            }
            if (or.length == 1){
                if (context.and){
                    if (!context.stackAnd) context.stackAnd = [];
                    context.stackAnd.push({ field: '$or', query: [or[0]] });
                }else context.query = or[0];
            }else{
                if (context.and){
                    if (!context.stackAnd) context.stackAnd = [];
                    context.stackAnd.push({ field: '$or', query: or });
                }else context.query.$or = or;
            }
            context.or = false;
        }else if (expression.nodeType == $data.Expressions.ExpressionType.And && context.stackAnd && context.stackAnd.length){
            var and = [];
            while (context.stackAnd.length){
                var field = context.stackAnd.pop();
                var expr = {};
                
                expr[field.field] = field.query;
                and.push(expr);
                delete context.query[field.field];
            }
            if (and.length == 1){
                if (context.or){
                    if (!context.stackOr) context.stackOr = [];
                    context.stackOr.push({ field: '$and', query: [and[0]] });
                }else context.query = and[0];
            }else{
                if (context.or){
                    if (!context.stackOr) context.stackOr = [];
                    context.stackOr.push({ field: '$and', query: and });
                }else context.query.$and = and;
            }
            context.and = false;
        }else if (expression.nodeType !== $data.Expressions.ExpressionType.And){
            if (expression.nodeType == $data.Expressions.ExpressionType.Equal){
                context.query[context.field] = context.value;
            }else if (expression.nodeType == $data.Expressions.ExpressionType.In && context.unary == $data.Expressions.ExpressionType.Not){
                if (!context.query[context.field]) context.query[context.field] = {};
                context.query[context.field].$nin = /*typeof context.value === 'object' ? JSON.parse(context.value) : */context.value;
                context.unary = undefined;
            }else{
                if (!context.query[context.field]) context.query[context.field] = {};
                context.query[context.field][expression.resolution.mapTo] = /*typeof context.value === 'object' ? JSON.parse(context.value) : */context.value;
            }
            
            if (context.or){
                if (!context.stackOr) context.stackOr = [];
                context.stackOr.push({ field: context.field, query: context.query[context.field] });
            }else if (context.and){
                if (!context.stackAnd) context.stackAnd = [];
                context.stackAnd.push({ field: context.field, query: context.query[context.field] });
            }
            
            context.field = undefined;
            context.value = undefined;
        }
    }