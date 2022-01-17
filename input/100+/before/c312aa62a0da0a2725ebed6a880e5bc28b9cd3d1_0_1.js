function initMyBookmarklet() {
    var displayHeight = "25px";
    trailDisplay = $(document.createElement("div"));
    trailDisplay.css({
        height:displayHeight,
        width: "100%",
        position:"fixed",
        top:"0px",
        "text-align":"left",
        "z-index": "1000",
        "padding-left":"10px",
        opacity: ".8",
        background: "#2E2E1F",
        color: "white",
        "line-height": "25px"
    });

    noteDisplayWrapper = $(document.createElement("div"));
    noteDisplayWrapper.css({
        height:"100%",
        width: "40%",
        "float":"right",
        "margin-left": "10%",
        "border-left": "solid",
        "opacity": "0"
    });
    noteDisplayWrapper.addClass("noteDisplayWrapper");

    previousNoteDisplay = $(document.createElement("div"));
    previousNoteDisplay.css({
        "margin": "0 0 0 5px",
        "font-size": "12px",
        "overflow": "hidden",
        "text-overflow": "ellipsis"
    });
    previousNoteDisplay.html("Select text and hold down mouse to save notes.  Your last saved note will appear here");


    var linkToTrailWrapper = $(document.createElement("div"));
    linkToTrailWrapper.css({
        height:"100%",
        width: "10%",
        "float": "right"
    });

    var linkToTrail = $(document.createElement("a"));
    linkToTrail.css({
        "margin": "0 0 0 5px",
        "font-size": "12px",
        "display": "block",
        "color": "white",
        "font-weight": "bold"
    });

    $(linkToTrail).html("View Trail");
    $(linkToTrail).attr('href',"http://localhost:3000/trails/"+trailID);

    deleteNoteButton = $(document.createElement("button"));
    deleteNoteButton.css({
        "font-size": "12px",
        "color": "white",
        "background-color": "transparent",
        "font-weight": "bold",
        height:"100%",
        width: "10%",
        "float": "right",
        "opacity": "0"
    });

    deleteNoteButton.html("Delete Note");
    deleteNoteButton.addClass("deleteNote");

    saveSiteToTrailButton = $(document.createElement("button"));
    saveSiteToTrailButton.css({
        "font-size": "12px",
        "color": "white",
        "background-color": "transparent",
        "font-weight": "bold",
        height:"100%",
        width: "10%",
        "float": "right"
    });

    saveSiteToTrailButton.html("Save site");

    //inserting global stylings
    var cssStyle = $(document.createElement("style"));
    $(document.getElementsByTagName("head")[0]).append(cssStyle);
    cssStyle.html(".siteFavicon {" +
        "padding-right: 2.5px;" +
        "padding-top: 2.5px;" +
        "float: left;" +
        "overflow: hidden;" +
        "display: block;" +
        "}" +
        ".siteFavicon img { " +
        "height: 20px;" +
        "}"
    );

    //adding all the toolbar elements to the DOM.
    $(document.body).prepend(trailDisplay);

    $(trailDisplay).append(deleteNoteButton);
    deleteNoteButton.click(deletePreviousNote);
    deleteNoteButton.attr("disabled","disabled");

    $(trailDisplay).append(noteDisplayWrapper);

    $(noteDisplayWrapper).append(previousNoteDisplay);

    $(trailDisplay).append(saveSiteToTrailButton);
    saveSiteToTrailButton.click(addSiteToTrail);

    $(trailDisplay).append(linkToTrailWrapper);
    $(linkToTrailWrapper).append(linkToTrail);

    initializeAutoResize();
    initializeJqueryEllipsis();
    previousNoteDisplay.ellipsis();

    //document bindings

    $(document.body).keypress(verifyKeyPress);
    document.onmousemove = mouseStopDetect();

    document.body.onmousedown = function() {
     mouseDown=1;
    };
    document.body.onmouseup = function() {
      mouseDown=0;
    };

    fetchFavicons();
}