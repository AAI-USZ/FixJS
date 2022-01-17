function() {
        expect(8);

        var $fixture = $('#qunit-fixture'),
            $link    = $fixture.find('a').eq(0),
            $span    = null,
            host     = null;

        equal($link.length, 1, 'A single element should be selected');

        $link.externalLinks();
        $span = $link.find('span');

        $link.each(function(n) {
            host = this.hostname;
        });

        ok($link.hasClass(defOpts.link_class), 'The (plugin default) \'' + defOpts.link_class + '\' CSS class should be set on the first link.');
        equal($span.length, 1, 'The first link should have a span child element.');
        ok($span.hasClass(defOpts.span_class), 'The (plugin default) \'' + defOpts.span_class + '\' CSS class should be set on the span child element.');
        equal($span.css('background-image'), 'url("' + defOpts.favicon_url + defOpts.url_seperator + host + '")', 'The span child element should have a correctly set background-image CSS property');

        equal($fixture.find('a.' + defOpts.link_class).length, 1, 'There should only be one link with a (plugin default) \'' + defOpts.link_class + '\' CSS class');
        equal($fixture.find('a span').length, 1, 'There should only be one link with a contained span element');
        notEqual($link.attr('class'), defOpts.link_class, 'The link should have the (plugin default) \'' + defOpts.link_class + '\' CSS class set in addition to CSS classes defined prior to calling the plugin');
    }