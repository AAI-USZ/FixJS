function(n) {
                var $this = $(this),
                    opts  = $this.data(datakey);

                if (!$.isObject(opts))
                    return;

                if (opts.link_class) $this.removeClass(opts.link_class);
                if (opts.span_class) $this.children('.' + opts.span_class).remove();

                $this.attr('target', opts.orig_target ? opts.orig_target : null);
            }