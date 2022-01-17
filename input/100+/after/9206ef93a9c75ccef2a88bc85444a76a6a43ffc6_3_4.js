function (url, ps, elem, hash, options) {

            this.url = url;

            this.options = options;

            this.hash = hash;

            this.settings = $.extend({}, this.defaultSettings);

            var active_fields = ['id', 'name', 'email', 'company'];

            for (var n in ps) {

                if (n != 'fields') {

                    if (ps[n] !== null) {

                        this.settings[n] = ps[n];

                    }

                } else {

                    active_fields = ps[n];

                }

            }

            if (typeof active_fields != 'string' && active_fields.join) {

                this.settings.fields = active_fields.join(',');

            } else {

                this.settings.fields = active_fields;

            }

            var self = this;

            var r = Math.random();

            $.wa.controller.random = r; // prevents a lost request from updating a page



            $.post(url, this.settings, function (response) {

                if ($.wa.controller.random != r || response.status != 'ok') {

                    return false;

                }



                // if there's no contacts on current page, but there are contacts in this view

                // then we need to change current page

                if (response.data.count && response.data.contacts && !response.data.contacts.length) {

                    var newOffset = Math.floor((response.data.count-1)/self.settings.limit)*self.settings.limit;

                    if (newOffset != self.settings.offset) {

                        $.wa.setHash($.wa.grid.hash + $.wa.grid.getHash({offset: newOffset}));

                    }

                    return false;

                }



                if (self.options && self.options.beforeLoad) {

                    self.options.beforeLoad.call($.wa.controller, response.data);

                }

                $("#contacts-container .tools-view li.selected").removeClass('selected');

                $("#contacts-container .tools-view li[rel=" + self.settings.view + "]").addClass('selected');



                if (response.data.title) {

                    $.wa.controller.setTitle(response.data.title);

                }

                if (response.data.desc) {

                    $.wa.controller.setDesc(response.data.desc);

                }

                if (response.data.fields) {

                    active_fields = response.data.fields;

                }



                // Update history

                if (response.data.history) {

                    $.wa.history.updateHistory(response.data.history);

                }



                elem = $(elem);

                elem.html(self.view(self.settings.view, response.data, active_fields));

                if (!options.hide_head) {

                    var pre = self.topLineHtml(self.settings.view);

                    if (pre) {

                        elem.before($(pre));

                    }

                }

                if (self.options && self.options.afterLoad) {

                    self.options.afterLoad(response.data);

                }

            }, "json");

        }