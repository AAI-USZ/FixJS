function() {
        this.contextCircle && this.contextCircle.setMap(null);
        this.undelegateEvents();
        this.$('.locationPicker').remove();
    }