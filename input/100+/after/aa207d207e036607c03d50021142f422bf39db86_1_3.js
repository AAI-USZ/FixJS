function(x) {
            var y, z, w, v, pid;
            var k, oldK, newId;

            y = x.parent;
            w = Mp[x.diffId];
            if (!w) {
                DEBUG1?console.log("case 1"):null;
                k = findPos(x);
                z = Mp[y.diffId]; // TODO always exists? what?
                newId = globalIdCounter++;
                E.push({ty:"insert", args:{data:x.data(), x:x.id, y:z.id, k:k, newId:newId}});
                w = EditorTree.applyIns(x, z, k, newId);
                map ? (map[w.id] = w) : null;
                    if (DEBUG1){t11.sanityCheck();t21.sanityCheck();}
                x.inOrder = true;
                w.inOrder = true;
                x.matched = true;
                w.matched = true;
                w.diffId = seed++;
                Mp[w.diffId] = x;
                Mp[x.diffId] = w;
                DEBUG1?console.log(t11.toString(0,Mp)):null;
            } else if (null !== y) { // !isRoot(x) and x has a partner.
                DEBUG1?console.log("case 2"):null;
                v = w.parent;
                if (w.getValue() != x.getValue()) {
                    DEBUG1?console.warn("case 2a"):null;
                    // args.parent and args.k are specifically for the RichTextEditor.
                    if (w.parent) {
                        pid = w.parent.id;
                        k = w.parent.children.indexOf(w);
                    } else {
                        pid = -1;
                        k = -1;
                    }
                    E.push({ty:"update", args:{pid:pid, x:w.id, k:k, val:x.data()}});
                    EditorTree.applyUpd(w, x);
                    if (DEBUG1){t11.sanityCheck();t21.sanityCheck();}
                    DEBUG1?console.log(t11.toString(0,Mp)):null;
                }
                if (!doMatch(y, v)) {
                    z = Mp[y.diffId]; // TODO always exists? what?
                    DEBUG1?console.warn("case 2b"):null;
                    k = findPos(x);
                    oldK = w.parent.children.indexOf(w);
                    if (oldK < 0)
                        console.error("idx bad applyMov");
                    if (w.parent == z && k > oldK)
                        --k;
                    E.push({ty:"move", args:{oldParent:w.parent.id,x:w.id, y:z.id, k:k, oldK:oldK}});
                    EditorTree.applyMov(w, z, k, oldK);
                    w.inOrder = true;
                    x.inOrder = true;
                    if (DEBUG1){t11.sanityCheck();t21.sanityCheck();}
                    DEBUG1?console.log(t11.toString(0,Mp)):null;
                }
            } else {
                DEBUG1?console.log("case 3"):null;
            }
            alignChildren(w, x);
                DEBUG1?console.log(t11.toString(0,Mp)):null;
        }