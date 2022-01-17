function newWindow(theTitle, x) {
        var newID = ("Window" + eid);
        $('#Window').html( "<div id='" + newID + "'>" + x + "</div>" );
        $('#' + newID).dialog({title: theTitle, width: '50%', height: 400} );
        $('#' + newID).fadeIn();
        eid++;        
    }