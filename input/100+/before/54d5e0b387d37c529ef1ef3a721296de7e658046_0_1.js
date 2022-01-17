function(animation)
    {
        var img = window.document.createElement("div");
        img.className = "player-sprite";

        var div = window.document.createElement("div");
        div.className = "player";
        div.appendChild(img);

        this.Trail[this.Trail.length] = {StartFrame:0,Element:div,Animation:animation,FrameIndex:0,LastImageSrc:"",Coords:[]};
    }