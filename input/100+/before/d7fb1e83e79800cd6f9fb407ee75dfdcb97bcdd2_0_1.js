function initNestedArrayStructure(ast, setInitialValues) {
        if(setInitialValues === true && ast.initializer === undefined) {
            reportError("Invalid value initializer while creating array", ast)
        }
        var sourceShape = ast.typeInfo.getOpenCLShape();
        var maxDepth = sourceShape.length;
        var s = "";
        var redu = 1; var rhs = ""; var lhs = "";
        for(var i = 0 ; i < maxDepth; i++) {
            for(var j = 0; j < sourceShape[i]*redu; j++) {
                lhs = "(" + getPointerCast(i, maxDepth, ast.typeInfo.OpenCLType) +
                    ast.memBuffers.list[i] + ")"
                    + "[" + j + "]";
                if(i === maxDepth-1 && setInitialValues) {
                    rhs = ast.initializer;
                }
                else {
                    rhs = "&((" + getPointerCast(i+1, maxDepth, ast.typeInfo.OpenCLType)
                    + ast.memBuffers.list[i+1]
                    + ")" + "[" + j*sourceShape[i+1] + "]" + ")";
                }
                s += lhs + " = " + rhs + " ,";
            }
            redu = redu*sourceShape[i];
        }
        return s;
    }