function() {
    var allValid = true;

    jsPlumb.select().each(function(conn) {
        allValid = allValid && conn.getParameter("initialize");
    });

    if (!allValid) {
        error("not all segment are initialize! check the orange one!");

        return;
    }

    $("#Timeline").del();
    $("#Timeline").Timeline({
        data: storyboardController.populateTimeline(),
        slideWidth: 900,
        frame: [],
        behavior: {
                    onClick: function (data) { 
                        var msg = "You clicked on segment " + data.name + ": { start: " + data.start + ", end: " + data.end + " }";
                        $("#eventMessage").text(msg);
                        // Qui facciamo il scene.remove () ...
                    },
                    onClick2: function (t) { 
                        var msg = "You clicked on column: " + t;
                        $("#eventMessage").text(msg);
                        gotoFrame (t * 12000 / 100); // TODO: bisogna conoscere la durata totale
                    },
                    onClick3: function (t) { 
                        var msg = "You clicked on actor: " + t;
                        $("#eventMessage").text(msg);
                    },
                    onClick4: function (t) { 
                        var msg = "You deselect the actor " + t;
                        $("#eventMessage").text(msg);
                    }
        }

    });
  
    storyboardController.processStoryboard();
}