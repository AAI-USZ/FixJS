function searchFieldCheck ( elem ) {
    var e = $( elem );
    if ( typeof( e.attr('name') ) != 'undefined' ) {
        var vName = e.attr('name').replace('field','value');
        var vText = $("td > input[name="+ vName +"]");
        var vSelect = $("td > select[name="+ vName +"]");
        if ( e.val() === 'status' ) {
            if (vSelect.attr('disabled')) {
                vSelect.attr('disabled', false);
                vSelect.show();
                vText.attr('disabled', true)
                vText.hide();
            }
        }
        else {
            if (vText.attr('disabled')) {
                vSelect.attr('disabled', true);
                vSelect.hide();
                vText.val('');
                vText.attr('disabled', false);
                vText.show();
            }
        }
    }
}