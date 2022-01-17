function(e){
        var self = this;
        return {
            type: e.type || 'Syntax',
            message: e.message,
            filename: path.basename(self.config.target),
            filepath: self.config.target
        }
    }