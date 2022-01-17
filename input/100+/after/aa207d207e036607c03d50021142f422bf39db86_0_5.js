function() {
            // Get local typing syncs.
            this.syncs = [];
            var currentSnap = this.snapshot();
            if (this.newSnapshot != currentSnap)
            {
                this.syncs = this.doTreeDiff(this.domTree, currentSnap);
                console.log("SECOND");array.forEach(this.syncs, function(at) { console.log(at); });
            }

            this.collab.resumeSync();
            this.collab.pauseSync();
            if (this.syncQueue.length > 0)
                this.applySyncs();
            this.oldSnapshot = this.snapshot();
            this.t = setTimeout(dojo.hitch(this, 'iterate'), this.interval);
        }