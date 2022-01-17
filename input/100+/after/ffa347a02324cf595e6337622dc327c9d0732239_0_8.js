function(e){
            var toDel = [];
            function del(node) {
                var id = node.item.id[0];
                var p = node.getParent();
                var children = p.getChildren();
                var item = node.item;
				/* Position for all children of the original node we are deleteing will
				   always be 0 since we delete in post-order traversal. */
                toDel.push([item,p.item.id[0],0,id]);
            }
            function postOrder(node) {
                var i;
                var children = node.getChildren();
                for (i = 0; i < children.length; ++i) {
                    postOrder(children[i]);
                }
                del(node);
            }
            // Move UI buttons out and hide them
            dojo.place('buttonContainer',document.body,'last');
            dojo.style('buttonContainer','display','none');
            this.collab.pauseSync();
            var target = this.tree.selectedNode;
			var targetId = target.item.id[0];
            if (!target.getParent().item) {
                return; // Can't delete the root.
            }

            // Correct way to delete is to delete all children (post-order traversal) first.
            postOrder(target);
			// Find the actual position of the last tree item (since its sync position won't be 0).
			var pos, p = target.getParent().item;
			array.some(p.children, function(at, i) {
				if (at.id[0] == targetId) {
					pos = i;
					return true;
				}
				return false;
			});
			array.forEach(toDel, dojo.hitch(this, function(itm) {
                this.store.deleteItem(itm[0]);
                this.store.save();
                this.onLocalDeleteNode(itm[1], itm[2], true, itm[3]);
            }));
            //if (document.getElementById("ps").value=="pause")
            //    this.collab.resumeSync();
            this.collab.resumeSync();
		}