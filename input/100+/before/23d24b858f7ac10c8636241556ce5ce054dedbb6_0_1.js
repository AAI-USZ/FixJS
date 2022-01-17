function(e) {
        var self    = this,
            $a      = $(e.target);

        e.preventDefault();
        e.stopPropagation();

        console.log("TopicsView::openInTab(): %s", $a.attr('href'));

        /* Post that we're ready
        proxy.postMessage({
            name:   'sidebar',
            action: 'visit',
            url:    $a.attr('href')
        });
        // */
    }