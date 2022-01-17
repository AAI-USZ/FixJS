function() {
            var syncs = null;
            this.newSnapshot = this.snapshot();
            if (null !== this.oldSnapshot && null !== this.newSnapshot) {
                if (this.oldSnapshot != this.newSnapshot) {
                    this.normalizeHTML();
                    this.newSnapshot = this.snapshot();
                    if (this.oldSnapshot != this.newSnapshot) {
                        syncs = this.syncs.concat(this.doTreeDiff(this.domTree, this.newSnapshot));
                        console.log("FIRST");array.forEach(syncs, function(at) { console.log(at); });
                    }
                }
                if (syncs) {
                    array.forEach(syncs, dojo.hitch(this, function(dd) {
                        var args = dd.args;
                        var obj;
                        // TODO refactor this...make the edit script give us exactly what we want to send.
                        switch (dd.ty) {
                            case "insert": // {x=new node data, y=parent, k=position, newId=new id}
                                obj = {};
                                obj.parentId = args.y;
                                obj.x = args.data;
                                obj.newId = args.newId;
                                obj.force = true;
                                DEBUG?console.log("sync(insert)",obj):null;
                                this.collab.sendSync("change." + args.y, obj, "insert", args.k);
                                break;
                            case "delete": // {x=node to delete, k=position of x in x.parent.children}
                                obj = {force:true, oldParent:args.parentId};
                                DEBUG?console.log("sync(delete)",obj):null;
                                this.collab.sendSync("change." + args.parentId, obj, "delete", args.k);
                                break;
                            case "update": // {x=node to update, val=node to copy from}
                                obj = {val:args.val, k:args.k, pid:args.pid};
                                DEBUG?console.log("sync(update)",obj):null;
                                // TODO do we ever update the root? we shouldnt allow it (or find a workaround)!
                                this.collab.sendSync("change." + args.pid, obj, "update", args.k);
                                break;
                            case "move": // {x=node to move, y=new parent, k=new position, oldK=old position}
                                obj = {oldParent:args.oldParent, id:args.x, newParent:args.y};
                                DEBUG?console.log("sync(del-move)",obj):null;
                                this.collab.sendSync("change." + args.oldParent, obj, "delete", args.oldK);
                                DEBUG?console.log("sync(ins-move)",obj):null;
                                this.collab.sendSync("change." + args.y, obj, "insert", args.k);
                                break;
                        }
                    }));
                }
            }
        }