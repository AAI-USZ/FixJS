function () {
                    // set state to `has_tempalte`
                    that.has_template = true;
                    // tell the user we're done
                    this.notify('post_fetch_template');
                    // resolve the entire fetching promise
                    dfrd.resolve();
                }