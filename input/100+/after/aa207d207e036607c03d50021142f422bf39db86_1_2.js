function(a, i) {
                var b, k, oldK;
                // The `&&` sequence point below ensures `b` is correctly set.
                if (a.matched && (b = Mp[a.diffId]) && b.parent == x && !b.inOrder) {
                    k = findPos(b);
                    oldK = w.children.indexOf(a);
                    if (oldK<0)
                        console.error("idx bad applyMov");
                    if (a.parent == w && k > oldK) // Minus one for 
                        --k;
                    E.push({ty:"move", args:{oldParent:a.parent.id,x:a.id, y:w.id, k:k, oldK:oldK}});
                    EditorTree.applyMov(a, w, k, oldK);
                    if (DEBUG1){t11.sanityCheck();t21.sanityCheck();}
                    a.inOrder = true;
                    b.inOrder = true;
                    DEBUG1?console.log(t11.toString(0,MMP)):null;
                }
            }