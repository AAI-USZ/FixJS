function() {
    //console.log("js/topics-sidebar.js: Document Ready.");

    // Establish our mainView
    var $curation   = $('#collaborative-curation');

    mainView = new TopicsView({el: $curation});
    $curation.data('view', mainView);

    /* Post that we're ready
    proxy.postMessage({
        name:   'sidebar',
        action: 'loaded',
        url:    'js/topics-sidebar.js'
    });
    // */

    $curation.on('load', function(e, msg) {
        mainView.setModel( msg.topics );
    });
}