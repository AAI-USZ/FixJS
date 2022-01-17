function() {
        var loader = new Image();
        //set the id, alt and src attributes of the loading image
        loader.setAttribute("id", "loading");
        loader.setAttribute("alt", "graph loading...");
        loader.setAttribute("src", "/img/icons/ajax-loader.gif");
        
        //append loader to report graph container
        $(".report_graph").append(loader);
    }