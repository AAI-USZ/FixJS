function() {
            this.drop.destroy();
            this.delegate.destroy();
            Sortable.unreg(this);
        }