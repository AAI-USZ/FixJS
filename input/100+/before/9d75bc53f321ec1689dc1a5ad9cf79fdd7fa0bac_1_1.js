function(el) {
            var self = this;

            this.subscribe(this.subscription, this.refresh);

            this.model(el);

            // render
            self.renderTemplate(el, self.TEMPLATE, function(el) {
                $('a.nav-sub-items',$(el)).click(function() {
                    $('i',$(this)).toggleClass('icon-chevron-right').toggleClass('icon-chevron-down');
                    $('ul',$(this).parent()).slideToggle();
                });
                $('ul.sub-nav li.active',$(el)).parent().show();
                $('i',$('ul.sub-nav li.active',$(el)).parent().parent()).toggleClass('icon-chevron-right').toggleClass('icon-chevron-down');
                el.swap();
            });
        }