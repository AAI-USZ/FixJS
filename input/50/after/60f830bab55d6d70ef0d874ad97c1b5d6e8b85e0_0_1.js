function() {
            var options = this.options, models = options.models;
            return !models || models.length - options.rows.length > options.tippingPoint;
        }