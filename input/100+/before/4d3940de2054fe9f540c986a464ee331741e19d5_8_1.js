function(expr, args) {
                        if (expr[0] == "dot" && expr[1][0] == "string" && args.length == 1
                            && (args[0][1] > 0 && expr[2] == "substring" || expr[2] == "substr")) {
                                return [ "call", [ "dot", expr[1], "slice"], args];
                        }
                        if (expr[0] == "dot" && expr[2] == "toString" && args.length == 0) {
                                // foo.toString()  ==>  foo+""
                                return [ "binary", "+", expr[1], [ "string", "" ]];
                        }
                        if (expr[0] == "name") {
                                if (expr[1] == "Array" && args.length != 1 && !scope.has("Array")) {
                                        return [ "array", args ];
                                }
                                if (expr[1] == "Object" && !args.length && !scope.has("Object")) {
                                        return [ "object", [] ];
                                }
                                if (expr[1] == "String" && !scope.has("String")) {
                                        return [ "binary", "+", args[0], [ "string", "" ]];
                                }
                        }
                }