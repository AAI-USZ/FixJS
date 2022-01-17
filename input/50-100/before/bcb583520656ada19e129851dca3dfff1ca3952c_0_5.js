function() {
    //console.log("js/topics-sidebar.js: Document Ready.");

    // Establish our primary view
    var $curation   = $('#collaborative-curation'),
        view        = new TopicsView({el: $curation});

    $curation.data('view', view);

    /* Include a document-level 'drop' handler to take care of 'drop' events
     * that have been proxied to the sidebar document via sbDndProxy()/sbDrop()
     * in the sidebar addon as 'dropExternal' events -- most likely because an
     * item was dropped on the splitter while the sidebar was closed.
     */
    $(document).on('dropExternal', function(e) {

        /* Create a new proxied event containing the incoming 'detail'
         * (dataTransfer) data and trigger that event on the first
         * '.curation-topic'.
         */
        var proxied     = $.Event('dropExternal', {
                                    detail: e.originalEvent.detail
                                  });

        $curation.find('.curation-topic:first').trigger( proxied );
    });
}