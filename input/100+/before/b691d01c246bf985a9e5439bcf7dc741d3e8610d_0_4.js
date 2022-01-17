function() {
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
    }