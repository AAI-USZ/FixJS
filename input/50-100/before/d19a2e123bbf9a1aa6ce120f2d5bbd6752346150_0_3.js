function() {
        var self = this;
        this.$("#task-list-body").html("");
        Greenmine.taskCollection.each(function(item) {
            self.addIssue(item);
        });
    }