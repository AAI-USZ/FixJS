function (scope, attrExpr, value){
        if(!attrExpr || !attrExpr.expression)
            return;
        var v = value;
        v = this.parseValue(v, attrExpr, scope);
        scope.$set(attrExpr.expression, v);
        scope.$parent.$eval();
    }