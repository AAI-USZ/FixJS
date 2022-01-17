function() {
        var context = this.getContext();
        if(this.attrs.lineJoin) {
            context.lineJoin = this.attrs.lineJoin;
        }
    }