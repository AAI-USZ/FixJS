function() {
            var options = this.options;
            return options.models.length - options.rows.length > options.tippingPoint;
        }