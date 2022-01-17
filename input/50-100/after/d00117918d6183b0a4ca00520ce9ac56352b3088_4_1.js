function(container, selector) {
                var loaderClass = selector ? selector : "loading",
                loader = new Image(),
                isLoaderSet = document.querySelectorAll("." + loaderClass).length;

                if(!isLoaderSet) {
                    //set the id, alt and src attributes of the loading image
                    loader.setAttribute("class", loaderClass);
                    loader.setAttribute("alt", "graph loading...");
                    loader.setAttribute("src", "/img/icons/ajax-loader.gif");
    
                    //append loader to it's container
                    $(container).append(loader);
                }
            }