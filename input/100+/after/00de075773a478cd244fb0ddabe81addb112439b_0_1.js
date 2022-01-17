function(n) {
                var $this = $(this),
                    host  = this.hostname;

                if (url) {
                    if ($.isArray(opts.special_hosts))
                        $.each(opts.special_hosts, function(i, v) {
                            if (!$.isArray(v) || v.length !== 2)
                                return;

                            if (host.match(v[0]))
                                host = v[1];
                        });

                    var idx  = furls.indexOf(host);

                    if (idx === -1) {
                        url     += opts.url_seperator + host;
                        finks[n] = furls.length;
                        furls.push(host);
                    } else {
                        finks[n] = idx;
                    }
                }

                $this.data(datakey, {
                    link_class      : opts.link_class,
                    span_class      : url ? opts.span_class : null,
                    orig_target     : $this.attr('target'),
                    favicon_url     : url,
                    span_position   : opts.span_position === 'right' ? 'right' : 'left'
                });
            }