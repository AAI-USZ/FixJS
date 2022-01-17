function(animation,followElement,folder)
    {
        var img = window.document.createElement("div");
        img.className = "player-sprite";

        var div = window.document.createElement("div");
        div.className = "player";
        div.style.backgroundImage = "url(images/misc/" + folder + "/trail-sprites.png)";
        div.appendChild(img);

        this.Trail[this.Trail.length] = {StartFrame:0,Element:div,Animation:animation,FrameIndex:0,LastImageSrc:"",Coords:[]};

        this.FollowElement = this.FollowElement || followElement;
        if(!!this.FollowElement)
        {
            var container = this.FollowElement.parentNode;
            if(container.children.length == 0)
                container.appendChild(div);
            else
                container.insertBefore(div,container.children[0]);
        }
    }