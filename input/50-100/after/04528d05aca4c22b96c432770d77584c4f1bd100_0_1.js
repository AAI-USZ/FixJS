function newWindow(theTitle, x) {
        var newID = ("Window" + eid);
        eid++;        
        $('#Window').append( "<div id='" + newID + "'>" + x + "</div>" );

        var w = $("body").find('#' + newID);
        
//        $('#' + newID).dialog({title: theTitle, width: '60%', height: 450} );
//        $('#' + newID).fadeIn();
        w.dialog({title: theTitle, width: '60%', height: 450} );
        w.fadeIn();

    }