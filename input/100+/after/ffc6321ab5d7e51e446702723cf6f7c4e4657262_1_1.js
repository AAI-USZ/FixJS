f    trailDisplay = $(document.createElement("div"));
    trailDisplay.css({
        height:"10%",
        width: "100%",
        position:"fixed",
        top:"0px",
        "text-align":"left",
        "z-index": "1000",
        "padding-left":"10px",
        opacity: ".8",
        background: "#2E2E1F",
        color: "#CCCCA3"
    });

    noteDisplayWrapper = $(document.createElement("div"));
    noteDisplayWrapper.css({
        height:"100%",
        width: "40%",
        top:"0px",
        "text-align":"left",
        "float":"right",
        "z-index": "0",
        opacity: ".8",
        background: "#2E2E1F",
        color: "#CCCCA3"
    });

    noteDisplay = $(document.createElement("div"));
    noteDisplay.css({
        height:"40%",
        width: "100%",
        top:"5%",
        "padding-left": "5px",
        "border-left": "solid",
        "text-align":"left",
        "z-index": "0",
        opacity: ".8",
        background: "#2E2E1F",
        color: "#CCCCA3",
        float: "right"
    });

    previousNoteDisplay = $(document.createElement("div"));
    previousNoteDisplay.css({
        height:"40%",
        width: "100%",
        position: "absolute",
        bottom:"5%",
        "padding-left": "5px",
        "border-top": "solid",
        "border-left": "solid",
        "text-align":"left",
        "z-index": "0",
        opacity: ".8",
        background: "#2E2E1F",
        color: "#CCCCA3",
        "overflow": "hidden",
        "text-overflow": "ellipsis"
    });

    linkToTrail = $(document.createElement("a"));
    linkToTrail.css({
        height:"100%",
        width: "40%",
        top:"0px",
        "text-align":"left",
        "float":"right",
        "z-index": "0",
        opacity: ".8",
        background: "#2E2E1F",
        "font-size": "24",
        color: "#CCCCA3"
    });

    //inserting global stylings
    var cssStyle = $(document.createElement("style"));
    $(document.getElementsByTagName("head")[0]).append(cssStyle);
    cssStyle.html(".siteFavicon {" +
        "padding-right: 5px;" +
        "padding-top: 10px;" +
        "float: left;"
    );

    //adding all the toolbar elements to the DOM.
    $(document.body).prepend(trailDisplay);

    trailDisplay.append(noteDisplayWrapper);
    noteDisplayWrapper.append(noteDisplay);
    noteDisplayWrapper.append(previousNoteDisplay);
    noteDisplay.html("Select text and hold down mouse to save notes");
    previousNoteDisplay.html("Your last saved note will appear here");
    noteDisplay.addClass("noteDisplay");

    $(trailDisplay).append(linkToTrail);
    $(linkToTrail).html("View Trail");
    $(linkToTrail).attr('href',"http://localhost:3000/trails/"+trailID);



    initializeJqueryEllipsis();
    noteDisplay.ellipsis();
    previousNoteDisplay.ellipsis();

    $(document.body).keypress(verifyKeyPress);
    document.onmousemove = mouseStopDetect();

    document.body.onmousedown = function() {
     mouseDown=1;
    };
    document.body.onmouseup = function() {
      mouseDown=0;
    };




    addSiteToTrail();
}
