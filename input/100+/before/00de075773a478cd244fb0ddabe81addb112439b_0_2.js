function(opts) {
            if (this.data(datakey))
                return this; // already initialized

            opts =  $.extend(true, {}, defopts, opts);

            var manipFn = 'prependTo', // manipulation method to use when injecting the favicon span elements
                url     = opts.favicon_url,
                finks   = [],
                furls   = [],
                items   = (typeof opts.link_selector === 'string' && opts.link_selector.length)
                        ? this.filter(opts.link_selector)
                        : this
                        ;

            if ('right' === opts.span_position)
                manipFn = 'appendTo';

            items
            // add css class to link
            .addClass(opts.link_class)
            // get list of hostnames,
            // map them to each given link,
            // build the favicon URL and
            // set the element data
            .each(function(n) {
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
            })
            // add the favicon element
            .each(function(n) {
                $('<span class="' + opts.span_class + '" style="background-image: url(' + url + ');background-position : right -' + finks[n] * 16 + 'px;"></span>')[manipFn](this);
            })
            // set target attribute to point to new window
            .attr('target', '_blank');

            // allow jQ method-chaining :)
            return this;
        }