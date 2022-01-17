function(n) {
                var $this = $(this),
                    host  = this.hostname;

                for (var shost in opts.special_hosts)
                    if (opts.special_hosts.hasOwnProperty(shost) && host.match(opts.special_hosts[shost]))
                        host = shost;

                var idx  = furls.indexOf(host);

                if (idx === -1) {
                    url     += opts.url_seperator + host;
                    finks[n] = furls.length;
                    furls.push(host);
                } else {
                    finks[n] = idx;
                }

                $this.data(datakey, {
                    link_class      : opts.link_class,
                    span_class      : opts.span_class,
                    orig_target     : $this.attr('target')
                });
            }