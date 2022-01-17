function() {
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
    }