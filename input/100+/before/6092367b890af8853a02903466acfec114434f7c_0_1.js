function (refresh) {
            // if we don't have the template cached or was asked to refresh it
            if ( ! this.has_template || refresh ) {
                // create a promise for retrieving all templates
                var dfrd = $.Deferred(),
                    // a stack for all template GET requests
                    requests = [],
                    // an error callback handler
                    failure = function (response) {
                        // tell the user we failed
                        this.notify.apply(this, ['fetchTemplate_error'].concat(uijet.Utils.toArray(arguments)));
                        // fail the whole fetching process
                        dfrd.reject();
                    },
                    partials = this.options.partials,
                    partials_dir = this.options.partials_dir || '',
                    that = this, p;
                // if asked to refresh then invalidate cache
                refresh && (this.has_template = false);
                // request the template
                requests.push(this.getTemplateUrl(), $.ajax({
                    context : this
                }).done( function (response) {
                    // cache result
                    this.template = response;
                }).fail(failure));
                // if we need to fetch partial templates
                if ( partials ) {
                    // loop over them
                    for ( p in partials ) (function (name, path) {
                        // build the path to each partial
                        var partial_path = uijet.options.TEMPLATES_PATH +
                                           partials_dir +
                                           path + "." +
                                           uijet.options.TEMPLATES_EXTENSION;
                        // request that partial
                        requests.push($.ajax(partial_path, {
                            context : that
                        }).done(function (partial) {
                            // when done cache it
                            this.partials[name] = partial;
                        })).fail(failure);
                    }(p, partials[p]));
                }
                // when all requests are resolved
                $.when.apply($, requests).then(function () {
                    // set state to `has_tempalte`
                    that.has_template = true;
                    // tell the user we're done
                    that.notify('post_fetch_template');
                    // resolve the entire fetching promise
                    dfrd.resolve();
                });
                return dfrd.promise();
            }
            // like a fulfilled promise
            return this;
        }