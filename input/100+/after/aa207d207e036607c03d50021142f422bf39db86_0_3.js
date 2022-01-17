function(oldTree, newHTML) {
            var newTree, diffs;
            this.newDiv.innerHTML = newHTML;
            newTree = EditorTree.createTreeFromElement(this.newDiv);
            preprocessTree(oldTree);
            preprocessTree(newTree);

            // Get diffs, then send syncs.
            var s=oldTree.toHTML()+"\n"+newTree.toHTML();
            diffs = EditorTree.treeDiff(oldTree, newTree, this.domTree_map);
            if (oldTree.toHTML() !=newTree.toHTML()) {
                console.error("diff broke");
                console.log(s);
                console.log(oldTree.toHTML());
                console.log(newTree.toHTML());
            }
            /* In rare certain cases, EditorTree.createTreeFromElement and toHTML
               return a different string than newHTML. The visual output *should* be
               the same, but just to be sure, match this._textarea.innerHTML to whatever
               is returned by toHTML. Documented cases appear below.
             
               1. "&nbsp" is converted to a single space character by toHTML.

               TODO It would be better if we could avoid this step somehow (ex: make
               createTreeFromElement always be the same as the input).
             */
            var html = this.toHTML();
            if (html != newHTML)
                this._textarea.innerHTML = html;
            return diffs;
        }