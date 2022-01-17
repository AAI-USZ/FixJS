function (key, effective) {

            var eff = u.isBool(key) ? key : effective; // allow 2nd parm as "effective" when no key

            return (new m.Method(this,

                function () {

                    var opts = $.extend({}, this.options);

                    if (eff) {

                        opts.render_select = u.updateProps(

                            {},

                            m.render_defaults,

                            opts,

                            opts.render_select);



                        opts.render_highlight = u.updateProps(

                            {},

                            m.render_defaults,

                            opts,

                            opts.render_highlight);

                    }

                    return opts;

                },

                function () {

                    return eff ? this.effectiveOptions() : this.options;

                },

                {

                    name: 'get_options',

                    args: arguments,

                    first: true,

                    allowAsync: true,

                    key: key

                }

            )).go();

        }