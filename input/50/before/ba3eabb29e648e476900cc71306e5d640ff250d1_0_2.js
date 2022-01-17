function() {
        var ext = this.filename.match(/\.[^.]+$/);
        if (!ext) ext = '.js';
        extensions[ext](this, this.filename);
    }