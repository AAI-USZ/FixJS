function() {
    //console.log("app.js: Document Ready.");

    // Establish our primary view
    var $curation   = $('#collaborative-curation'),
        view        = new app.view.TopicsView({el: $curation});
}