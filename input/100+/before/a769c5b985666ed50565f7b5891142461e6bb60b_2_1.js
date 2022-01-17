function() {
        var self = this;

        this.$("#selected-filters").html("");

        this.$(".list-body").html("");

        Greenmine.taskCollection.each(function(item) {
            self.addIssue(item);
        });

        this.$("#tags-body").html("");
        Greenmine.tagCollection.each(function(item) {
            self.addTag(item);
        });
        this.$("#tags-filter-section").toggle(Greenmine.tagCollection.length!=0);

        this.$("#milestones-body").html("");
        Greenmine.milestoneCollection.each(function(item) {
            self.addMilestone(item);
        });
        this.$("#milestones-filter-section").toggle(Greenmine.milestoneCollection.length!=0);

        this.$("#status-body").html("");
        Greenmine.statusCollection.each(function(item) {
            self.addStatus(item);
        });
        this.$("#status-filter-section").toggle(Greenmine.statusCollection.length!=0);

        this.$("#assigned-to-body").html("");
        Greenmine.assignedToCollection.each(function(item) {
            self.addAssignedTo(item);
        });
        this.$("#assigned-to-filter-section").toggle(Greenmine.assignedToCollection.length!=0);

        if (this.$("#selected-filters .category").length > 0) {
            this.$(".remove-filters").show();
        }
        else {
            this.$(".remove-filters").hide();
        }
        Greenmine.main.colorizeTags();
    }