function ($jc$) {
                                var p = $jc$.pstack[$jc$.pscope].join(', '),
                                    str = 'var f = function (' + p + ') {\n$jc$.sstack.push([]);\n$jc$.scope++;\nvar r = (function () {\n' + $jc$.compile(node.children[1], true) + '})();\n$jc$.sstack.pop();\n$jc$.scope--;\nreturn r;\n}; f;';

                                // the function code formatted:
                                /*
                                var f = function (_parameters_) {
                                    // handle the stack
                                    $jc$.sstack.push([]);
                                    $jc$.scope++;

                                    // this is required for stack handling: usually at some point in a function
                                    // there's a return statement, that prevents the cleanup of the stack.
                                    var r = (function () {
                                        _compiledcode_;
                                    })();

                                    // clean up the stack
                                    $jc$.sstack.pop();
                                    $jc$.scope--;

                                    // return the result
                                    return r;
                                };
                                f;   // the return value of eval()
                                */

                                try{
                                    return eval(str);
                                } catch(e) {
                                    this._error('catch errors. super simple stuff.', e.toString())
                                    return function () {};
                                }
                            }