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
            return array.indexOf(u.parent.children, u) + 1;
        }