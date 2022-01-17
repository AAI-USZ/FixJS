function(from, to) {
        var rest = this.slice((to || from) + 1 || this.length);

        if (from < 0) {
             this.length = this.length + from;
        } else {
             this.length = from;
        }

        return this.push.apply(this, rest);
    }