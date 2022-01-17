function(container) {
                var loader = new Image();
                //set the id, alt and src attributes of the loading image
                loader.setAttribute("id", "loading");
                loader.setAttribute("alt", "graph loading...");
                loader.setAttribute("src", "/img/icons/ajax-loader.gif");

                //append loader to it's container
                console.log(container);
                console.log(loader);
                $(container).append(loader);
            }