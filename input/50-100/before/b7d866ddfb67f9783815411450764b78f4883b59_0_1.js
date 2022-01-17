function() {
        console.log("hurrah - convexProcessor is running");
        this.factory = new betterform.ui.UIElementFactory();
        this.convex = document.getElementById("convex");
        dojo.subscribe("xforms-invalid",function(value){
           console.debug("received event: ", value); 
        });
    }