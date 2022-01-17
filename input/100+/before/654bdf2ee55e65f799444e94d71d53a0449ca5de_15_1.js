f
    var ActivityCollection = PaginatedCollection.extend({
        model: Activity,

        baseUrl: '/activity',

        groupOrUser: null,

        initialize: function (models, options) {
            _.bindAll(this, 'onSuccess', 'onSuccessWithAddFix', 'getFetchOptions');
            PaginatedCollection.prototype.initialize.apply(this, arguments);
            typeof (options) != 'undefined' || (options = {});

            if (options.groupOrUser) {
                this.groupOrUser = options.groupOrUser;
                this.baseUrl = '/' + options.groupOrUser.id + '/activity';
            }

            // Set the moment in time (UTC) around which all activity queries will be performed
            var now = new Date();
            this.baselineDateTime = new Date(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds());
        },

        comparator: function (streamItem) {
            return -parseInt(streamItem.get('CreatedDateTimeOrder'));
        },

        fetchFirstPage: function () {
            this.firstPage(this.getFetchOptions(true, 'olderThan'));
        },

        fetchNextPage: function () {
            this.nextPage(this.getFetchOptions(true, 'olderThan'));
        },

        fetchNewItems: function () {
            this.fetch(this.getFetchOptions(true, 'newerThan'));
        },

        getFetchOptions: function (add, newerOrOlder) {
            var options = {
                data: {},
                add: add,
                success: null
            };
            if (add) {
                options.success = this.onSuccess;
            } else {
                options.success = this.onSuccessWithAddFix;
            }
            if (this.groupOrUser) {
                //if (this.groupOrUser instanceof Organisation || this.groupOrUser instanceof Team || this.groupOrUser instanceof Project) {
                if (this.groupOrUser instanceof Project) {
                    options.data.groupId = this.groupOrUser.id;
                } else if (this.groupOrUser instanceof User) {
                    options.data.userId = this.groupOrUser.id;
                }
            }

            // Get either items newer than or older than baseline
            options.data[newerOrOlder] = this.baselineDateTime;

            return options;
        },

        onSuccess: function (collection, response) {
            //app.stream.trigger('fetchingItemsComplete', app.stream, response);
        },

        onSuccessWithAddFix: function (collection, response) {
            this.onSuccess(collection, response);
            // Added the following manual triggering of 'add' event due to Backbone bug: https://github.com/documentcloud/backbone/issues/479
            var self = this;
            response.each(function (item, index) {
                self.trigger('add', item, self, { Index: index });
            });
        }
    });

    return ActivityCollection;

});
