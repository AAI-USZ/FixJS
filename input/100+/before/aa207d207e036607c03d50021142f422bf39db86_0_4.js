function() {
            var syncs = null;
            this.newSnapshot = this.snapshot();
            if (null !== this.oldSnapshot && null !== this.newSnapshot) {
                if (this.oldSnapshot != this.newSnapshot) {
                    this.normalizeHTML();
                    this.newSnapshot = this.snapshot();
                    if (this.oldSnapshot != this.newSnapshot) {
                        syncs = this.syncs.concat(this.doTreeDiff(this.domTree, this.newSnapshot));
                        array.forEach(syncs, function(at) { console.log(at.ty); });
                    }
                }
                var collab = this.collab;
                if (syncs) {
                    array.forEach(syncs, function(dd) {
                        var args = dd.args;
                        var obj;
                        // TODO refactor this...make the edit script give us exactly what we want to send.
                        switch (dd.ty) {
                            case "insert": // {x=new node data, y=parent, k=position, newId=new id}
                                obj = {};
                                obj.parentId = args.y.id;
                                obj.x = args.x.data();
                                obj.newId = args.newId;
                                obj.force = true;
                                collab.sendSync("change." + args.y.id, obj, "insert", args.k);
                                break;
                            case "delete": // {x=node to delete, k=position of x in x.parent.children}
                                obj = {force:true, id:args.x.parent.id};
                                collab.sendSync("change." + args.x.parent.id, obj, "delete", args.k);
                                break;
                            case "update": // {x=node to update, val=node to copy from}
                                obj = {val:args.val.data(), id:args.x.id};
                                collab.sendSync("change." + args.x.id, obj, "update", 0);
                                break;
                            case "move": // {x=node to move, y=new parent, k=new position, oldK=old position}
                                obj = {id:args.x.id, newParent:args.y.id};
                                console.log("move",obj,args.x.data);
                                collab.sendSync("change." + args.x.parent.id, obj, "delete", args.oldK);
                                collab.sendSync("change." + args.y.id, obj, "insert", args.k);
                                break;
                        }
                    });
                }
            }
        }