function(t1, t2) {
        t11 = t1;
        t21=t2;
        DEBUG1?console.log(t1.toHTML()):null;
        DEBUG1?console.log(t2.toHTML()):null;
        var M, Mp, E;
        var seed, counter;
        var tmp;

        // If the roots are not equal, add another level with identical roots.
        if (!t1.equalsDeep(t2)) {
            console.error("heads not equal");
            return false;
        }

        // TODO should inline?
        function doMatch(x, y) {
            // Checking .matched might save a lookup of Mp which might be costly (just a guess).
            return x.matched && y.matched && Mp[x.diffId].diffId == y.diffId;
        }
        function alignChildren(w, x) {
            var S1, S2, S2;
            array.forEach(w.children, function(at, i) {
                    at.inOrder = false;
            });
            array.forEach(x.children, function(at, i) {
                    at.inOrder = false;
            });
            /* S1 is children of w whose partners are children of x.
               S2 is children of x whose partners are children of w. */
            S1 = [];
            S2 = [];
            array.forEach(w.children, function(at, i) {
                if (treeNodeIndexOf(x.children, at, EditorTree.compare) >= 0)
                    S1.push(at);
            });
            array.forEach(x.children, function(at, i) {
                if (treeNodeIndexOf(w.children, at, EditorTree.compare) >= 0)
                    S2.push(at);
            });

            // Remember, S contains elements from `S1`, not `S2`.
            S = LCS(S1, S2, doMatch); // iff (a,b) \in Mp
            array.forEach(S, function(at, i) {
                // For each (a,b) in S, mark nodes as in order.
                at.inOrder = true;
                Mp[at.diffId].inOrder = true;
            });

            // Careful...O(n^2).
            /*array.forEach(S1, function(a, i) {
                array.forEach(S2, function(b, j) {
                    var k;
                    if (a.matched && b.equalsDeep(Mp[a.diffId]) && treeNodeIndexOf(S, a, EditorTree.compare) < 0) {
                        k = findPos(b);
                        E.push({ty:"move", args:{x:a,y:w,k:k}});
                        EditorTree.applyMov(a, w, k);
                        DEBUG1?console.log(t11.toString()):null;
                        a.inOrder = true;
                        b.inOrder = true;
                    }
                });
            });*/
            // Better way than above O(n^2):
            array.forEach(S1, function(a, i) {
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
            });
        }
        // Assumes !isRoot(x).
        function findPos(x) { // x \in T_2.
            var y, w, tmp, v, idx, u;
            var siblings;

            y = x.parent;
            w = Mp[x.diffId];
            siblings = y.children;

            // Find leftmost "in order" node.
            tmp = false;
            for (i in siblings) {
                checkPoison(siblings[i].inOrder);
                if (siblings[i].inOrder) {
                    tmp = siblings[i];
                    break;
                }
            }
            if (tmp && x.diffId == tmp.diffId) {
                console.log("findPos=0");
                return 0;
            }

            /* Find v \in T_2 where v is the rightmost sibling of x that is to the left
               of x and is marked "in order." */
            idx = array.indexOf(siblings, x) - 1;
            for ( ; idx >= 0 && checkPoison(siblings[idx].inOrder) &&
                    !siblings[idx].inOrder; --idx)
                ;
            if (idx < 0) {
                return 0;
            }
            v = siblings[idx]; // ??? what if idx < 0?
            u = Mp[v.diffId];
            checkPoison(u.inOrder);
            if (!u.inOrder)
                console.error("!u.inOrder");
            if (!u.parent)
                console.error("!u.parent");
            return array.indexOf(u.parent.children, u) + 2; // + 2 since 1-indexed.
        }

        // Prepare the two trees for a diff. Each node must have a globally unique id (diffId).
        globalIdCounter = -1; // This will be set to the max + 1 of t1's node's ids.
        seed = 0;
        counter = 0;
        t1.levelOrder(function(at) {
            at.diffId = seed++;
            at.matched = false;
            at.inOrder = 0xdeadbeef;
            if (at.id > globalIdCounter)
                globalIdCounter = at.id;
        });
        ++globalIdCounter;
        counter = 0;
        t2.levelOrder(function(at) {
            at.diffId = seed++;
            at.matched = false;
            at.inOrder = 0xdeadbeef;
        });
        if (1) {
            M = getPartialMatches(t1, t2);
            DEBUG1?console.log("M1=",(function(){var x=0; for (i in M){console.log(i+"="+M[i]);++x;}return x;})()):null;
        }else{
            M = changeDistillingMatch(t1, t2);
            DEBUG1?console.log("M2=",(function(){var x=0; for (i in M){console.log(i+"="+M[i]);++x;}return x;})()):null;
        }
        Mp = {};
        for (tmp in M)
            Mp[tmp] = M[tmp];
        E = [];
        DEBUG1?console.log(t1.toString(0,Mp)):null;
        DEBUG1?console.log(t2.toString(0,Mp)):null;

        // Insert, update, align, and move phases all at once:
        t2.levelOrder(function(x) {
            var y, z, w, v;
            var k, oldK, newId;

            y = x.parent;
            w = Mp[x.diffId];
            if (!w) {
                DEBUG1?console.log("case 1"):null;
                k = findPos(x);
                z = Mp[y.diffId]; // TODO always exists? what?
                newId = globalIdCounter++;
                E.push({ty:"insert", args:{x:x, y:z, k:k, newId:newId}});
                w = EditorTree.applyIns(x, z, k, newId);
                    if (DEBUG1){t11.sanityCheck();t21.sanityCheck();}
                x.inOrder = true;
                w.inOrder = true;
                x.matched = true;
                w.matched = true;
                w.diffId = seed++;
                Mp[w.diffId] = x;
                Mp[x.diffId] = w;
                DEBUG1?console.log(t11.toString()):null;
            } else if (null !== y) { // !isRoot(x) and x has a partner.
                DEBUG1?console.log("case 2"):null;
                v = w.parent;
                if (w.getValue() != x.getValue()) {
                    DEBUG1?console.warn("case 2a"):null;
                    E.push({ty:"update", args:{x:w, val:x}});
                    EditorTree.applyUpd(w, x);
                    if (DEBUG1){t11.sanityCheck();t21.sanityCheck();}
                    DEBUG1?console.log(t11.toString()):null;
                }
                if (!doMatch(y, v)) {
                    z = Mp[y.diffId]; // TODO always exists? what?
                    DEBUG1?console.warn("case 2b"):null;
                    k = findPos(x);
                    oldK = w.parent.children.indexOf(w);
                    if (oldK < 0)
                        console.error("idx bad applyMov");
                    E.push({ty:"move", args:{x:w, y:z, k:k, oldK:oldK}});
                    EditorTree.applyMov(w, z, k, oldK);
                    if (DEBUG1){t11.sanityCheck();t21.sanityCheck();}
                    DEBUG1?console.log(t11.toString()):null;
                }
            } else {
                DEBUG1?console.log("case 3"):null;
            }
            alignChildren(w, x);
        });
        DEBUG1?console.log("OK\n\n\nready\n\n"+t1.toString(0,Mp)+"\n"+t2.toString(0,Mp)):null;
        // Delete phase.
        var postOrderList = [];
        getPostOrderList = function(w) {
            if (!Mp[w.diffId]) {
                postOrderList.push(w);
            }
        };
        t1.postOrder(getPostOrderList);
        array.forEach(postOrderList, function(w, i) {
            var pos;
            if (!Mp[w.diffId]) {
                pos = treeNodeIndexOf(w.parent.children, w, EditorTree.compare); // TODO could memoize this?
                if (pos<0) // TODO remove
                    console.error("idx bad applyDel!",siblings.indexOf(x));
                E.push({ty:"delete", args:{x:w,k:pos}});
                EditorTree.applyDel(w, pos);
                    if (DEBUG1){t11.sanityCheck();t21.sanityCheck();}
                DEBUG1?console.log(t11.toString()):null;
            }
        });
        return E;
    }