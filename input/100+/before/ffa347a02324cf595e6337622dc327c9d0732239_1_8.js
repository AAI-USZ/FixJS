function(e){
            var toDel = [];
            var del = dojo.hitch(this, function(node) {
                var pos;
                var id = node.item.id[0];
                var p = node.getParent();
                var children = p.getChildren();
                var item = node.item;
                for(var i=0; i<children.length; i++){
                    if(children[i].item.id[0] == id)
                        pos = i;
                }
                // delete item from store & save
                toDel.push([item,p.item.id[0],pos,id]);
            });
            var postOrder = dojo.hitch(this, function(node) {
                var i;
                var children = node.getChildren();
                for (i = 0; i < children.length; ++i) {
                    postOrder(children[i]);
                }
                del(node);
            });
            // Move UI buttons out and hide them
            dojo.place('buttonContainer',document.body,'last');
            dojo.style('buttonContainer','display','none');
            this.collab.pauseSync();
            var target = this.tree.selectedNode;
            if (!target.getParent().item) {
                return; // Can't delete the root.
            }

            // Correct way to delete is to delete all children (post-order traversal) first.
            postOrder(target);
            for (var i =0;i<toDel.length; ++i) {
                var itm = toDel[i];
                if(itm[0]!=this.tree.selectedItem)
                {
                    console.log("SFEFSE",itm[0],this.tree.selectedItem);
                    debugger;
                }
                this.store.deleteItem(itm[0]);
                this.store.save();
                this.onLocalDeleteNode(itm[1], itm[2], true,itm[3]);
            }
            //if (document.getElementById("ps").value=="pause")
            //    this.collab.resumeSync();
            this.collab.resumeSync();
		}