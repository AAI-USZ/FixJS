function (opt) {
            if (opt) {
                this.fetchData = _.extend({}, this.fetchData, opt);
            }
            return this;
        }