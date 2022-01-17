function(item){

                    var t = (root = getRoot(item)).nodeType == 1
                        // in DocumentFragment
                        ? baidu.query(selector, root)
                        : da;

                    for (var i=0, n=t.length; i<n; i++) {
                        if (t[i] === item) {
                            results.push(item);
                            break;
                        }
                    }
                }