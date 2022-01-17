function() {
            var syncs = null;
            this.newSnapshot = this.snapshot();
            if (null !== this.oldSnapshot && null !== this.newSnapshot) {
                if (this.oldSnapshot != this.newSnapshot) {
                    this.normalizeHTML();
                    this.newSnapshot = this.snapshot();
                    if (this.oldSnapshot != this.newSnapshot) {
                        syncs = this.syncs.concat(this.doTreeDiff(this.oldSnapshot, this.newSnapshot));
                    }
                }
                if (syncs) {
                    array.forEach(syncs, function(dd) {
                        var args = dd.args;
                        // TODO send only the essential data.
                        switch (dd.ty) {
                            case "insert": // {x=new node data, y=parent, k=position}
                                obj.force = true;
                                this.collab.sendSync("change" + args.y.id, args.x, "insert", args.k);
                                break;
                            case "delete": // {x=node to delete, k=position of x in x.parent.children}
                                obj.force = true;
                                this.collab.sendSync("change" + args.x.parent.id, null, "delete", args.k);
                                break;
                            case "update": // {x=node to update, val=node to copy from}
                                this.collab.sendSync("change" + args.x.id, args.val, "update", 0);
                                break;
                            case "move": // {x=node to move, y=new parent, k=new position, oldK=old position}
                                this.collab.sendSync("change" + args.x.parent.id, null, "delete", args.oldK);
                                this.collab.sendSync("change" + args.y.id, args.x, "insert", args.k);
                                break;
                        }
                    });
                }
            }
        }