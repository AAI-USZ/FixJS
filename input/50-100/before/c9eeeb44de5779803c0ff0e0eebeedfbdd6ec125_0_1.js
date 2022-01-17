function () {
                var locals = self.options;
                locals.hasHeader = self.hasHeader;

console.log('slave.js locals', locals);

                if (locals.hasHeader) {
                    locals.headerHeight = self.headerHeight;
                    locals.headerPath = self.headerPath + "/";
                }

                return ejs.render(PRISON_TEMPLATE, {locals: locals});
            }