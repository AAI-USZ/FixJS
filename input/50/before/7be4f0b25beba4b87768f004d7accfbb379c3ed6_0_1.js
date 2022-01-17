function () {
            var offset = (this.pager.page - 1) * this.pager.count;

            return { limit:this.pager.count, offset:offset };
        }