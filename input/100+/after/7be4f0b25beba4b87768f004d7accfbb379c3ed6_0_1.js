function ($, Backbone, _, App) {

    // Create Customers collection and add it to App.Collection
    App.provide('Collection.Base', Backbone.Collection.extend({
        fetchData: {},
        pager:{},
        addFetchData:function (opt) {
            if (opt) {
                this.fetchData = _.extend({}, this.fetchData, opt);
            }
            return this;
        },
        removeFetchData:function(opt) {
            if (opt) {
                for (var i=0; i<opt.length; i++) {
                    if (this.fetchData[opt[i]]) {
                        delete this.fetchData[opt[i]];
                    }
                }
            }
            return this;
        },
        load: function (opt) {
            if (opt) {
                this.fetchData = $.extend(true, {}, this.fetchData, opt);
            }
            this.fetchData = $.extend(true, {}, this.fetchData, this.getPagerOptions());

            this.fetch({ data: this.fetchData });
        },
        getPager: function() {
            return {
                current: this.pager.page,
                prev: (this.pager.page > 1),
                next: (this.pager.page < this.pageCount()),
                total: this.pageCount()
            };
        },
        resetPager:function () {
          this.pager = {
              count:20,
              page:1,
              total:0
          };
        },
        getPagerOptions:function () {
            var offset = (this.pager.page - 1) * this.pager.count;

            return { limit:this.pager.count, offset:offset };
        },
        pageCount:function () {
            return (this.pager.count > 0) ? Math.floor(this.pager.total / this.pager.count) : 0;
        },
        prevPage:function () {
            if (this.pager.page > 0) {
                this.pager.page -= 1;
            } else {
                this.pager.page = 1;
            }
            this.load();

        },
        setPage:function (num) {
            num = num || 1;
            if (num >= 1 && num <= this.pageCount()) {
                this.pager.page = num;
            } else {
                this.pager.page = 1;
            }
            this.load();
        },
        nextPage:function() {
            if (this.pager.page <= this.pageCount()) {
                this.pager.page += 1;
            } else {
                this.pager.page = this.pageCount();
            }
            this.load();
        },
        parse:function (response, xhr) {
            if (xhr.getResponseHeader('X-Pagination-Total-Results')) {
                this.pager.total = xhr.getResponseHeader('X-Pagination-Total-Results');
            }

            return response;
        }
    }));

}