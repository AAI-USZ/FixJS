function addManifestRefresh() {
    $('#manifest-url a.button').on('click', _pd(function(e) {
        var p = $.ajax({url: $(e.target).data("url"),
                        type: "POST"});
        p.then(function() {
             var refreshed = gettext("Refreshed");
             $("#manifest-url th.label").append('<span class="hint">' + refreshed + '</span>');
        });
    }));
}