function(ast, rest) {
            var bod;
            ast.leisureCodeOffset = ast.leisureDefPrefix = line.length - pfx.length;
            ast.leisureBase = getNthBody(ast, nm.length);
            nameAst(nm[0], ast);
            bod = ast;
            if (nm.length > 1) bod = getNthBody(ast, nm.length);
            if (getAstType(bod) === 'lambda') {
              bod.exprType = nm[0];
              ast.exprDataType = nm[0];
            }
            if (nm.length === 1) nameAst(nm[0], ast);
            ast.leisurePrefixSrcLen = pfx.length;
            ast.leisurePrefixCount = nm.length - 1;
            ast.leisureSource = pfx.substring(0, pfx.length - rest.length).trim();
            if (!isEmpty(typeAssertions)) {
              ast.leisureTypeAssertions = typeAssertions;
              ast.leisureArgNames = nm;
              console.log("arg names: " + nm);
            }
            return genCode(ast, nm[0], globals, defType, rest, parseOnly, namespace, ast.leisureSource, debug);
          }