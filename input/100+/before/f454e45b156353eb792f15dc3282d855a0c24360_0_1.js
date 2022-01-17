function(e) {
         if (content.getStyle("display") == "none") {

           content.setStyle("display", "");
           content.scale([null, 0]);
           content.animate({
             duration: duration,
             origin: "top center",
             keep: 100,
             keyFrames: {
               0: {
                 "padding-bottom": "0px",
                 "padding-top": "0px",
                 "scale": [null, 0],
                 "height": "0px"
                },
               100: {
                 "padding-bottom": "10px",
                 "padding-top": "10px",
                 "scale": [null, 1],
                 "height": content.offsetHeight-20 + "px"
                }
             }
           }).once("animationEnd", function() {
             content.scale(1);
             indicator.setHtml("[-]");
           });

         } else {
           content.animate({
             duration: duration,
             origin: "top center",
             keyFrames: {
               0: {
                 "padding-bottom": "10px",
                 "padding-top": "10px",
                 "scale": [null, 1],
                 "height": content.offsetHeight-20 + "px"
                },
               100: {
                 "padding-bottom": "0px",
                 "padding-top": "0px",
                 "scale": [null, 0],
                 "height": "0px"
                }
             }
           }).once("animationEnd", function() {
             this.setStyle("display", "none");
             indicator.setHtml("[+]");
           });
         }
       }