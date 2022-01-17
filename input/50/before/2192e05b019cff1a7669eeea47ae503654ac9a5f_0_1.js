function (opt) {
            if (opt) {
                this.fetchData = $.extend(true, {}, this.fetchData, opt);
            }
            return this;
        }