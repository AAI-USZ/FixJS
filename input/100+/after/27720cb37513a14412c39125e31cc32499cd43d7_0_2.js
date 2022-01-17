function() {
        var self = this;
        this.$("#task-list-body").html("");
        Greenmine.taskCollection.each(function(item) {
            self.addIssue(item);
        });

        this.$("#tags-body").html("");
        Greenmine.tagCollection.each(function(item) {
            self.addTag(item);
        });

        this.$("#milestones-body").html("");
        Greenmine.milestoneCollection.each(function(item) {
            self.addMilestone(item);
        });

        this.$("#status-body").html("");
        Greenmine.statusCollection.each(function(item) {
            self.addStatus(item);
        });

        this.$("#assigned-to-body").html("");
        Greenmine.assignedToCollection.each(function(item) {
            self.addAssignedTo(item);
        });

    }