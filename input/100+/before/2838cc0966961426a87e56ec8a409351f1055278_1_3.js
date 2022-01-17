function(a, i) {
                var b, k, oldK;
                // The `&&` sequence point below ensures `b` is correctly set.
                if (a.matched && (b = Mp[a.diffId]) && a.diffId == b.diffId && S.indexOf(a) < 0) {
                    k = findPos(b);
                    //idx = treeNodeIndexOf(xparent.children, x, EditorTree.compare); // TODO could memoize this?
                    oldK = a.parent.children.indexOf(x);
                    if (oldK<0)
                        console.error("idx bad applyMov");
                    E.push({ty:"move", args:{x:a, y:w, k:k, oldK:oldK}});
                    EditorTree.applyMov(a, w, k, oldK);
                    if (DEBUG1){t11.sanityCheck();t21.sanityCheck();}
                    DEBUG1?console.log(t11.toString()):null;
                    a.inOrder = true;
                    b.inOrder = true;
                }
            }