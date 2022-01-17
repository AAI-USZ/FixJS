function() {
        var ext = this.filename.match(/\.[^.]+$/)[0];
        if (!ext) ext = '.js';
        extensions[ext](this, this.filename);
    }