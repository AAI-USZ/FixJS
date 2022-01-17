function () {
        var self = this;

console.log('attach resource set', this.options);

        var prisonResourceSet = basePrisonResourceSet.concat();
        prisonResourceSet.addResource({
            path: "/",
            content: function () {
                var locals = self.options;
                locals.hasHeader = self.hasHeader;

console.log('slave.js locals', locals);

                if (locals.hasHeader) {
                    locals.headerHeight = self.headerHeight;
                    locals.headerPath = self.headerPath + "/";
                }

                return ejs.render(PRISON_TEMPLATE, {locals: locals});
            }
        });

        this._resourceMiddleware.mount(this.prisonPath, prisonResourceSet);
    }