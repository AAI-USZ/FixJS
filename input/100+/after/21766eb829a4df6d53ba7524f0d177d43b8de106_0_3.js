function() {
        expect(6);

        var $fixture = $('#qunit-fixture'),
            $link    = $fixture.find('a').eq(0),
            $span    = null,
            host     = null;

        $link.externalLinks(customCssOpts);
        $span = $link.find('span');

        ok($link.hasClass(customCssOpts.link_class), 'The \'' + customCssOpts.link_class + '\' CSS class should be set on the first link.');
        ok($span.hasClass(customCssOpts.span_class), 'The \'' + customCssOpts.span_class + '\' CSS class should be set on the span child element.');

        equal($fixture.find('a.' + customCssOpts.link_class).length, 1, 'There should only be one link with a \'' + customCssOpts.link_class + '\' CSS class');
        equal($fixture.find('a.' + defOpts.link_class).length, 0, 'There should only be NO link with a (plugin default) \'' + customCssOpts.link_class + '\' CSS class');
        equal($fixture.find('a span').length, 1, 'There should only be one link with a contained span element');
        notEqual($link.attr('class'), customCssOpts.link_class, 'The link should have the \'' + customCssOpts.link_class + '\' CSS class set in addition to CSS classes defined prior to calling the plugin');

    }