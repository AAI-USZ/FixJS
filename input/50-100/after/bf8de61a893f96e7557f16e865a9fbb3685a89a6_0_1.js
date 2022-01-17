function (scope, attrExpr, value){
        console.log("000");
        if(!attrExpr || !attrExpr.expression)
            return;
        var v = value;
        v = this.parseValue(v, attrExpr, scope);
        scope.$set(attrExpr.expression, v);
        console.log("111");
        scope.$parent.$eval();
        console.log("222");
    }