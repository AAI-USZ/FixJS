function(oldHTMl, newHTML) {
            var tmpDiv, oldTree, newTree, diffs;
            this.oldDiv.innerHTML = oldHTML;
            this.newDiv.innerHTML = newHTML;
            oldTree = EditorTree.createTreeFromElement(this.oldDiv);
            newTree = EditorTree.createTreeFromElement(this.newDiv);
            preprocessTree(oldTree);
            preprocessTree(newTree);

            // Get diffs, then send syncs.
            return EditorTree.treeDiff(oldTree, newTree);

            tmpDiv = this.oldDiv;
            this.oldDiv = this.newDiv;
            this.newDiv = tmpDiv;
        }