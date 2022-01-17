function newWindow(theTitle, x) {
        var newID = ("Window" + eid);
        $('#Window').html( "<div id='" + newID + "'>" + x + "</div>" );
        $('#' + newID).dialog({title: theTitle, width: '60%', height: 450} );
        $('#' + newID).fadeIn();
        eid++;        
    }