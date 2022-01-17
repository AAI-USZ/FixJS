function(el) {
            var self = this;

            this.setupSidebar(el);

            // set up the dashlets
            this.setupDashlets(el);

            // set up the page
            this.setupPage(el);

            this.subscribe(this.subscription, this.refresh);

            this.model(el);

            // render
            self.renderTemplate(el, self.TEMPLATE, function(el) {
                el.swap();
            });
        }