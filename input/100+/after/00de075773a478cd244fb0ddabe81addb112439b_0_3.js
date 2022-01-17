function($) {
    var datakey = '$external-link-data';

    var defopts = {
        favicon         : true,
        favicon_url     : 'http://favicon.yandex.net/favicon',
        url_seperator   : '/',
        link_class      : 'external-link',
        // the following means only allow 'A' dom elements will be effected by this plugin (by default)
        link_selector   : 'a',
        span_class      : 'ext-favicon',
        // left or right (determines where the span is inject relative to the link)
        span_position   : 'right',
        // array of regexps and alternative hostnames to use if a URLs host matches the corresponding regexp
        special_hosts   : [
            [/github\.com$/, 'github.com']
        ]
    };

    var methods = {
        init        : function(opts) {
            if (this.data(datakey))
                return this; // already initialized

            if (opts && $.isArray(opts.special_hosts))
                $.merge(opts.special_hosts, defopts.special_hosts);

            opts = $.extend({}, defopts, opts);

            var manipFn = 'prependTo', // manipulation method to use when injecting the favicon span elements
                url     = opts.favicon ? opts.favicon_url : null,
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
            })
            // set target attribute to point to new window
            .attr('target', '_blank');

            // add the favicon element
            if (url) items.each(function(n) {
                $('<span class="' + opts.span_class + '" style="background-image: url(' + url + ');background-position : right -' + finks[n] * 16 + 'px;"></span>')[manipFn](this);
            })

            // allow jQ method-chaining :)
            return this;
        },

        destroy     : function() {
            return this.each(function(n) {
                var $this = $(this),
                    opts  = $this.data(datakey);

                if (!$.isPlainObject(opts) || !opts.span_position)
                    return;

                if (opts.link_class)
                    $this.removeClass(opts.link_class);

                if (opts.favicon_url) {
                    var css_class  = opts.span_class ? '.' + opts.span_class : '',
                        css_psuedo = opts.span_position === 'right' ? ':last-child' : ':first-child';

                    $this.children('span' + css_psuedo + css_class).remove();
                }

                $this.attr('target', opts.orig_target ? opts.orig_target : null);
            });
        }
    };

    $.fn.externalLinks = function(meth) {
        if (methods[meth])
            return methods[meth].apply(this, Array.prototype.slice.call(arguments, 1));

        if (typeof meth === 'object' || !meth)
            return methods.init.apply(this, arguments);

        $.error('Method ' +  meth + ' does not exist on jQuery.externalLinks');
    };

}