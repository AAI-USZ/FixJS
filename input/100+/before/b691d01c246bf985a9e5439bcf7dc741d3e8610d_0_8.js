function() {
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
    }