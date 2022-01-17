function(w, i) {
            var pos;
            if (!Mp[w.diffId]) {
                pos = w.parent.children.indexOf(w);
                if (pos<0) // TODO remove
                    console.error("idx bad applyDel!",siblings.indexOf(x));
                E.push({ty:"delete", args:{x:w,k:pos}});
                EditorTree.applyDel(w, pos);
                    if (DEBUG1){t11.sanityCheck();t21.sanityCheck();}
                DEBUG1?console.log(t11.toString(0, MMP)):null;
            }
        }