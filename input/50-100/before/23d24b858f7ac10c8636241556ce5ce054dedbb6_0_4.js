function() {
        var self    = this;

        if (_.isString( self.template ))
        {
            // Resolve our template
            var html    = $(self.template).html();
            try {
                //ItemView.prototype.template = _.template( html );
                self.__proto__.template = _.template( html );
            } catch(e) {
                console.log("Template error:", e.message,
                            ", html[", html, "]");
            }
        }

        if (self.options.model)
        {
            // Trigger an initial rendering
            self.render();
        }
    }