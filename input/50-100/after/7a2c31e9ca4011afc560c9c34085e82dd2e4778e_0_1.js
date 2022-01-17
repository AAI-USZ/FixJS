function(event) {
        event.preventDefault();

        var target = $(event.currentTarget).closest('.list-item');
        var task = Greenmine.taskCollection.get(target.data('id'));

        this.lightbox.setReference(task);
        this.lightbox.open();
    }