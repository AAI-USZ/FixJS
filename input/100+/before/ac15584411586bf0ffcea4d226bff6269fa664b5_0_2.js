function createDialogForSessions(){
    $('a#manage-sessions').click(function() {
        var url = this.href;
        // show a spinner or something via css
        var dialog = $('<div style="display:none" class="loading" title="Manage sessions"></div>').appendTo('body');
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
//         dialog.load(
//             url,
//             {}, // omit this param object to issue a GET request instead a POST request, otherwise you may provide post parameters within the object
//             function (responseText, textStatus, XMLHttpRequest) {
//                 // remove the loading class
//                 dialog.removeClass('loading');
//             }
//         );
        //prevent the browser to follow the link
        return false;
    });
}