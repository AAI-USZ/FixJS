function doTest(at) {
        var idCounter = 0;
        var id1 = at[0];
        var id2 = at[1];
        var tree1 = EditorTree.createTreeFromElement(id1);
        var tree2 = EditorTree.createTreeFromElement(id2);
        tree2.beginTag = tree1.beginTag;
        preprocessTree(tree1);
        preprocessTree(tree2);
        var html1 = dom.byId(id1);
        var html2 = dom.byId(id2);
        // Give tree1 some dummy ids.
        DEBUG1=true;
        tree1.levelOrder(function(at) { at.id = idCounter++; });
        console.log(tree1.toHTML());
        console.log(tree2.toHTML());
        var diffs = EditorTree.treeDiff(tree1, tree2);
        console.log(tree1.toHTML());
        console.log(tree2.toHTML());
        if (!deepEquals(tree1, tree2)) {
            Failures.push(id1.substring(0, id1.length - 4));
        }

        // Now, apply diffs to tree1 (EditorTree.treeDiff changes tree1 as it proceeds).
        var tree1_tochange = EditorTree.createTreeFromElement(id1);
        preprocessTree(tree1_tochange);
        // Give tree1 the SAME dummy ids as the original tree1.
        idCounter = 0;
        tree1_tochange.levelOrder(function(at) { at.id = idCounter++; });
        var tree1Map = {};
        tree1_tochange.levelOrder(function(at) {
            tree1Map[at.id] = at;
        });
        array.forEach(diffs, function(at) {
            var w;
            var ty = at.ty;
            var args = at.args;
            if ("insert" == ty) {
                w = EditorTree.applyIns(args.x, tree1Map[args.y.id], args.k, args.newId);
                tree1Map[w.id] = w;
            } else if ("update" == ty) {
                EditorTree.applyUpd(tree1Map[args.x.id], args.val);
            } else if ("move" == ty) {
                EditorTree.applyMov(tree1Map[args.x.id], tree1Map[args.y.id], args.k, args.oldK);
            } else if ("delete" == ty) {
                EditorTree.applyDel(tree1Map[args.x.id], args.k);
            }
        });
        if (!deepEquals(tree1, tree1_tochange)) {
            Failures.push(id1.substring(0, id1.length - 4));
        }
    }