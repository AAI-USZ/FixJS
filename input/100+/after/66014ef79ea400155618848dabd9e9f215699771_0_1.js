function ($) {
    "use strict";

    // these need to match the default options in the plugin
    var defOpts         = {
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

    // below are a series of object literals for plugin options [re-]used in various tests.
    var noFaviconOpts   = {
        favicon         : false
    };
    var customCssOpts   = {
        link_class      : 'custom-link',
        span_class      : 'custom-span'
    };

    // ------------------------------------------------------------------------------
    // ------------------------------------------------------------------------------

    // unit-test-module options
    var moduleOpts    = {
        teardown: function() {}
    };

    //module('Plugin is chainable', moduleOpts);
    test('Plugin is chainable', function() {
        expect(1);

        var $links = $('#qunit-fixture a'),
            $chain = $links.externalLinks();

        deepEqual($links, $chain, 'The plugin should be chainable.');
    });

    // -----------------------
    module('One link with defaults', moduleOpts);
    //
    test('Init on first link only', function() {
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
    });
    //
    test('Destroy on first link only', function() {
        expect(5);

        var $fixture = $('#qunit-fixture'),
            $link    = $fixture.find('a').eq(0),
            css      = $link.attr('class');

        $link.externalLinks();

        equal($fixture.find('a.' + defOpts.link_class).length, 1, 'There should only be one link with a (plugin default) \'' + defOpts.link_class + '\' CSS class before `destroy`');
        equal($fixture.find('a span').length, 1, 'There should only be one link with a contained span element before `destroy`');

        $link.externalLinks('destroy');

        equal($fixture.find('a.' + defOpts.link_class).length, 0, 'There should be no links with a (plugin default) \'' + defOpts.link_class + '\' CSS class after `destroy`');
        equal($fixture.find('a span').length, 0, 'There should be no links with a contained span element after `destroy`');
        equal($link.attr('class'), css, 'The link\'s class attribute should be restored to the original value after `destroy`');
    });

    // -----------------------
    module('One link with defaults, but no favicon', moduleOpts);
    //
    test('Init on first link only', function() {
        expect(2);

        var $fixture = $('#qunit-fixture'),
            $link    = $fixture.find('a').eq(0),
            $span    = null,
            host     = null;

        $link.externalLinks(noFaviconOpts);
        $span = $link.find('span');

        $link.each(function(n) {
            host = this.hostname;
        });

        equal($span.length, 0, 'The first link should NOT have a span child element.');
        equal($fixture.find('a span').length, 0, 'There should be NO link with a contained span element');
    });
    //
    test('Destroy on first link only', function() {
        expect(4);

        var $fixture = $('#qunit-fixture'),
            $link    = $fixture.find('a').eq(0),
            css      = $link.attr('class');

        $link.externalLinks(noFaviconOpts);

        equal($fixture.find('a.' + defOpts.link_class).length, 1, 'There should only be one link with a (plugin default) \'' + defOpts.link_class + '\' CSS class before `destroy`');
        equal($fixture.find('a span').length, 0, 'There should be NO link with a contained span element before `destroy`');

        $link.externalLinks('destroy');

        equal($fixture.find('a.' + defOpts.link_class).length, 0, 'There should be no links with a (plugin default) \'' + defOpts.link_class + '\' CSS class after `destroy`');
        equal($link.attr('class'), css, 'The link\'s class attribute should be restored to the original value after `destroy`');
    });

    // -----------------------
    module('One link with custom css classes', moduleOpts);
    //
    test('Init on first link only', function() {
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

    });
    //
    test('Destroy on first link only', function() {
        expect(5);

        var $fixture = $('#qunit-fixture'),
            $link    = $fixture.find('a').eq(0),
            css      = $link.attr('class');

        $link.externalLinks(customCssOpts);

        equal($fixture.find('a.' + customCssOpts.link_class).length, 1, 'There should only be one link with a \'' + customCssOpts.link_class + '\' CSS class, before `destroy`');
        equal($fixture.find('a span').length, 1, 'There should only be one link with a contained span element, before `destroy`');

        $link.externalLinks('destroy');

        equal($fixture.find('a.' + customCssOpts.link_class).length, 0, 'There should be no links with a (plugin default) \'' + customCssOpts.link_class + '\' CSS class, after `destroy`');
        equal($fixture.find('a span').length, 0, 'There should be no links with a contained span element, after `destroy`');
        equal($link.attr('class'), css, 'The link\'s class attribute should be restored to the original value, after `destroy`');
    });

    // -----------------------
    module('All contained links', moduleOpts)
    //
    test('Init links', function() {
        var $fixture = $('#qunit-fixture'),
            $links   = $fixture.find('a'),
            $spans   = null;

        $links.externalLinks();
        $spans = $links.find('span');

        $links.each(function(n) {
            var host = this.hostname;
        });

        equal($fixture.find('a.' + defOpts.link_class).length, $links.length, 'All links should have the \'' + defOpts.link_class + '\' CSS class');
        equal($fixture.find('a span.' + defOpts.span_class).length, $links.length, 'All links should have a contained span element with \'' + defOpts.link_class + '\' CSS class');
    });
    //
    test('Destroy links', function() {
        var $fixture = $('#qunit-fixture'),
            $links   = $fixture.find('a'),
            $spans   = null;

        $links.externalLinks();
        $spans = $links.find('span');

        $links.each(function(n) {
            var host = this.hostname;
        });

        equal($fixture.find('a.' + defOpts.link_class).length, $links.length, 'All links should have the \'' + defOpts.link_class + '\' CSS class, before `destroy`');
        equal($fixture.find('a span.' + defOpts.span_class).length, $links.length, 'All links should have a contained span element with \'' + customCssOpts.link_class + '\' CSS class, before `destroy`');

        $links.externalLinks('destroy');

        equal($fixture.find('a.' + defOpts.link_class).length, 0, 'NO links should have the \'' + defOpts.link_class + '\' CSS class, after `destroy`');
        equal($fixture.find('a span.' + defOpts.span_class).length, 0, 'NO links should have a contained span element with \'' + customCssOpts.link_class + '\' CSS class, after `destroy`');
    });
}