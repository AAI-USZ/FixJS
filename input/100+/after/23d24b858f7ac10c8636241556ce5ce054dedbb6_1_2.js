function(e) {
        var self    = this,
            $a      = $(e.target);

        e.preventDefault();
        e.stopPropagation();

        log("TopicsView::openInTab(): %s, %sshift, %sctrl, %salt, %smeta",
                $a.attr('href'),
                (e.shiftKey ? ' ' : '!'),
                (e.altKey   ? ' ' : '!'),
                (e.ctrlKey  ? ' ' : '!'),
                (e.metaKey  ? ' ' : '!'));

        // Post that we're ready
        proxy.postMessage({
            name:   'sidebar',
            action: 'visit',
            url:    $a.attr('href'),
            current:(! e.metaKey)
        });
    }