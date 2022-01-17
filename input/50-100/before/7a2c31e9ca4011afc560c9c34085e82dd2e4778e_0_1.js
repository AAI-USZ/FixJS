function(event) {
        event.preventDefault();
        var target = $(event.currentTarget).closest('.un-us-item');
        var task = Greenmine.taskCollection.get(target.data('id'));

        this.lightbox.setReference(task);
        this.lightbox.open();
        this.lightbox.on('delete', this.deleteIssue);
    }