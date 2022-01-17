function () {
                var node, rangeInfo, locInfo;

                skipComment();
                rangeInfo = [index, 0];
                locInfo = {
                    start: {
                        line: lineNumber,
                        column: index - lineStart
                    }
                };

                node = parseFunction.apply(null, arguments);
                if (typeof node !== 'undefined') {

                    if (range) {
                        rangeInfo[1] = index;
                        node.range = rangeInfo;
                    }

                    if (loc) {
                        locInfo.end = {
                            line: lineNumber,
                            column: index - lineStart
                        };
                        node.loc = locInfo;
                    }

                    if (isBinary(node)) {
                        visit(node);
                    }

                    if (node.type === Syntax.MemberExpression) {
                        if (typeof node.object.range !== 'undefined') {
                            node.range[0] = node.object.range[0];
                        }
                        if (typeof node.object.loc !== 'undefined') {
                            node.loc.start = node.object.loc.start;
                        }
                    }

                    if (node.type === Syntax.CallExpression) {
                        if (typeof node.callee.range !== 'undefined') {
                            node.range[0] = node.callee.range[0];
                        }
                        if (typeof node.callee.loc !== 'undefined') {
                            node.loc.start = node.callee.loc.start;
                        }
                    }
                    return node;
                }
            }