function createDialogForID(id){
    $(id).click(function() {
        var url = this.href;
        var title = this.title;
        // show a spinner or something via css
        var dialog = $('<div style="display:none" class="loading" title="'+title+'"></div>').appendTo('body');
        // open the dialog
        dialog.dialog({
            // add a close listener to prevent adding multiple divs to the document
            close: function(event, ui) {
                // remove div with all data and events
                dialog.remove();
            },
            modal: true
        });

//      load remote content
        $.ajax({
            url: url,
            async: true,
            success: function(results){
                dialog.removeClass('loading');
                dialog.html(results);
            }
        });
        //prevent the browser to follow the link
        return false;
    });
}